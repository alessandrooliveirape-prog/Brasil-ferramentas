#!/usr/bin/env python3
"""
AFFILIATE ASSISTANT v1.0
Interactive CLI tool to manage Amazon + Shopee affiliate links
across your Tool Brasil and Chá Certo projects.

Usage:
    python affiliate-assistant.py
"""

import os, re, sys, shutil, subprocess
from pathlib import Path

# Fix Windows console encoding for Unicode
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

PROJECTS = {
    # dir is relative to the script's own location
    # Script is in Brasil-ferramentas-main/ -> . = this project
    "1": {"name": "Tool Brasil (toolbrasil.com.br)", "dir": ".", "config": "src/config/affiliate-links.ts", "id_field": "toolId"},
    "2": {"name": "Chá Certo (chacerto.com)", "dir": "../chacerto", "config": "client/src/config/affiliate-links.ts", "id_field": "pagePath"},
}

if sys.stdout.isatty():
    G = lambda t: f"\033[92m{t}\033[0m"; Y = lambda t: f"\033[93m{t}\033[0m"
    C = lambda t: f"\033[96m{t}\033[0m"; R = lambda t: f"\033[91m{t}\033[0m"
    B = lambda t: f"\033[1m{t}\033[0m"; D = lambda t: f"\033[2m{t}\033[0m"
else:
    G = Y = C = R = B = D = lambda t: t


def ph(t): print(f"\n{C('═'*60)}\n  {B(t)}\n{C('═'*60)}\n")
def ok(m): print(f"  {G('✓')} {m}")
def info(m): print(f"  {C('ℹ')} {m}")
def warn(m): print(f"  {Y('⚠')} {m}")
def err(m): print(f"  {R('✗')} {m}")

def inp(p):
    while True:
        v = input(f"  {C('→')} {p}: ").strip()
        if v: return v
        warn("Obrigatório!")

def opt(p): return input(f"  {C('→')} {p} ({D('opcional')}): ").strip()

def yn(p, d=True):
    v = input(f"  {C('→')} {p} [{'Y/n' if d else 'y/N'}]: ").strip().lower()
    return d if not v else v in ("s","sim","y","yes")

def parse_cfg(fp):
    if not fp.exists(): err(f"Não encontrado: {fp}"); return None, []
    with open(fp, "r", encoding="utf-8") as f: lines = f.readlines()
    entries = []; i = 0
    while i < len(lines):
        m = re.match(r'^\s+(toolId|pagePath):\s+\'([^\']+)\',?\s*$', lines[i].strip())
        if m:
            eid = m.group(2); start = i; depth = 0; opened = False; end = start
            for j in range(start, len(lines)):
                if "{" in lines[j]: opened = True
                if opened:
                    depth += lines[j].count("{") - lines[j].count("}")
                    if depth == 0 and opened: end = j; break
            entries.append({"id": eid, "start": start, "end": end})
            i = end + 1
        else: i += 1
    return lines, entries

def count_products(fp, entry):
    with open(fp, "r", encoding="utf-8") as f: lines = f.readlines()
    return sum(1 for l in lines[entry["start"]:entry["end"]+1] if "title:" in l)

def add_product(fp, tool_id, product):
    with open(fp, "r", encoding="utf-8") as f: content = f.read()
    m = re.search(rf"(toolId|pagePath):\s*'{re.escape(tool_id)}'", content)
    if not m: err(f"'{tool_id}' não encontrada!"); return False
    ps = content.find("products: [", m.end())
    if ps < 0: err("'products: [' não encontrado!"); return False
    depth = 0; started = False; ins = ps + len("products: [")
    for i in range(ins, len(content)):
        if content[i] == "[":
            if not started: started = True
            depth += 1
        elif content[i] == "]":
            depth -= 1
            if depth < 0 and started: ins = i; break
    else: err("Fim do array não encontrado!"); return False
    np = "      {\n"
    np += f"        title: '{product['title']}',\n"
    if product.get("description"): np += f"        description: '{product['description']}',\n"
    if product.get("amazon_url"): np += f"        amazonUrl: '{product['amazon_url']}',\n"
    if product.get("shopee_url"): np += f"        shopeeUrl: '{product['shopee_url']}',\n"
    np += "      },\n"
    shutil.copy2(fp, fp.with_suffix(".ts.bak"))
    with open(fp, "w", encoding="utf-8") as f: f.write(content[:ins] + "\n" + np + content[ins:])
    return True

def add_new_entry(fp, tool_id, products, id_field):
    with open(fp, "r", encoding="utf-8") as f: content = f.read()
    end = content.rfind("];")
    if end < 0: err("Fim do array não encontrado!"); return False
    ne = f"  {{\n    {id_field}: '{tool_id}',\n    products: [\n"
    for p in products:
        ne += "      {\n"
        ne += f"        title: '{p['title']}',\n"
        if p.get("description"): ne += f"        description: '{p['description']}',\n"
        if p.get("amazon_url"): ne += f"        amazonUrl: '{p['amazon_url']}',\n"
        if p.get("shopee_url"): ne += f"        shopeeUrl: '{p['shopee_url']}',\n"
        ne += "      },\n"
    ne += "    ],\n  },\n"
    shutil.copy2(fp, fp.with_suffix(".ts.bak"))
    with open(fp, "w", encoding="utf-8") as f: f.write(content[:end] + ne + content[end:])
    return True

def collect_product(title=""):
    print(f"\n{D('─'*40)}")
    t = title or inp("Nome do produto")
    return {"title": t, "description": opt("Descrição"), "amazon_url": opt("Link Amazon") or None, "shopee_url": opt("Link Shopee") or None}

def run():
    ph(f"ASSISTENTE DE AFILIADOS  {chr(128666)}  Amazon + Shopee")
    script_dir = Path(__file__).parent.resolve()
    proj_key = None
    while not proj_key:
        for k, v in PROJECTS.items():
            d = (script_dir / v["dir"]).resolve()
            print(f"  [{k}] {v['name']}")
            print(f"       {D(str(d))}")
        c = input(f"\n  {C('→')} Projeto [{B('1')}]: ").strip() or "1"
        if c in PROJECTS:
            fp = (script_dir / PROJECTS[c]["dir"] / PROJECTS[c]["config"]).resolve()
            if fp.exists(): proj_key = c; ok(f"{PROJECTS[c]['name']}")
            else: err(f"Config não encontrado: {fp}")
        else: err("Inválido!")
    proj = PROJECTS[proj_key]
    config_path = (script_dir / proj["dir"] / proj["config"]).resolve()
    while True:
        ph(f"MENU • {B(proj['name'])}")
        print(f"  [{B('1')}] {G('Listar')} produtos configurados")
        print(f"  [{B('2')}] {G('Adicionar')} a ferramenta/página existente")
        print(f"  [{B('3')}] {G('Nova')} ferramenta/página")
        print(f"  [{B('4')}] {Y('Rápida')} — colar vários links de uma vez")
        print(f"  [{B('5')}] {D('Trocar')} projeto")
        print(f"  [{R('0')}] Sair\n")
        c = input(f"  {C('→')} Opção: ").strip()
        if c == "0": print(f"\n  {G('Ate mais!')} {chr(128640)}\n"); break
        elif c == "1":
            _, entries = parse_cfg(config_path)
            if not entries: warn("Nada configurado!")
            else:
                ph("PRODUTOS CONFIGURADOS"); total = 0
                for e in entries:
                    n = count_products(config_path, e); total += n
                    s = G(f"{n} produtos") if n > 0 else D("vazio")
                    print(f"  {B(e['id'])}: {s}")
                print(f"\n  {D('═'*30)}\n  Total: {B(len(entries))} configs, {B(total)} produtos")
            input(f"\n  {D('Enter...')}")
        elif c == "2":
            label = "Página" if proj_key == "2" else "Ferramenta"
            _, entries = parse_cfg(config_path)
            all_ids = [e["id"] for e in entries]
            if not all_ids: warn("Nada configurado ainda! Crie uma nova primeiro."); continue
            ph(f"{label}S ({len(all_ids)})")
            for idx, tid in enumerate(all_ids, 1): print(f"  [{idx:3d}] {tid}")
            tid = input(f"\n  {C('→')} Nº ou ID: ").strip()
            if tid.isdigit() and 1 <= int(tid) <= len(all_ids): tid = all_ids[int(tid)-1]
            if tid in all_ids:
                products = []; info("Adicione os produtos (Enter vazio = parar)")
                while True:
                    p = collect_product(); products.append(p); ok(f"'{p['title']}' adicionado!")
                    if not yn("Mais um?", False): break
                ok_all = all(add_product(config_path, tid, p) for p in products)
                if ok_all:
                    print(f"\n{G(chr(9989) + ' ATUALIZADO!')}"); ok(f"Backup: {config_path.with_suffix('.ts.bak').name}")
                    if yn("Verificar TypeScript?", True):
                        proj_dir = (script_dir / proj["dir"]).resolve()
                        r = subprocess.run(["npx", "tsc", "--noEmit"], cwd=str(proj_dir), capture_output=True, text=True, timeout=60)
                        if r.returncode == 0: ok("TypeScript OK!" + chr(9989))
                        else:
                            err("ERRO! Revertendo...")
                            bkp = config_path.with_suffix(".ts.bak")
                            if bkp.exists(): shutil.copy2(bkp, config_path); ok("Restaurado!")
                            print(f"\n{R(r.stderr[:2000])}")
                else: err("Falha!")
            else: err(f"'{tid}' não encontrada!")
        elif c == "3":
            label = "Página" if proj_key == "2" else "Ferramenta"
            tid = inp(f"ID da nova {label}")
            products = []; info("Produtos (Enter vazio = parar)")
            while True:
                p = collect_product(); products.append(p); ok(f"'{p['title']}' adicionado!")
                if not yn("Mais um?", False): break
            if add_new_entry(config_path, tid, products, proj["id_field"]):
                print(f"\n{G(chr(9989) + ' CRIADA!')}"); ok(f"Backup: {config_path.with_suffix('.ts.bak').name}")
            else: err("Falha!")
        elif c == "4":
            label = "Página" if proj_key == "2" else "Ferramenta"
            tid = inp(f"ID da {label}")
            _, entries = parse_cfg(config_path)
            existing_ids = {e["id"] for e in entries}
            print(f"  {D('Formato: Produto, Link Amazon, Link Shopee, Descrição')}")
            print(f"  {D('Ex: Kit Chá Verde, https://amzn.to/xyz, https://shopee.com.br/abc, Chá 200g')}")
            print(f"  {D('Linha vazia = finalizar')}\n")
            lines = []
            while True:
                try: l = input().strip()
                except: break
                if not l: break
                lines.append(l)
            if not lines: err("Nada!"); continue
            products = []
            for l in lines:
                parts = [p.strip() for p in l.split(",")]
                if parts:
                    p = {"title": parts[0], "description": "", "amazon_url": None, "shopee_url": None}
                    if len(parts)>=2 and parts[1]: p["amazon_url"] = parts[1]
                    if len(parts)>=3 and parts[2]: p["shopee_url"] = parts[2]
                    if len(parts)>=4 and parts[3]: p["description"] = parts[3]
                    products.append(p)
            ok(f"{len(products)} produto(s)")
            all_ok = True
            if tid in existing_ids:
                ok(f"'{tid}' existe. Adicionando...")
                for p in products:
                    if not add_product(config_path, tid, p): all_ok = False; break
            else:
                ok(f"'{tid}' nova. Criando...")
                all_ok = add_new_entry(config_path, tid, products, proj["id_field"])
            if all_ok: print(f"\n{G(chr(9989) + ' PRONTO!')}")
            else: err("Falha!")
        elif c == "5": proj_key = None; proj = None
        else: warn("Opção inválida!")

if __name__ == "__main__":
    try: run()
    except (KeyboardInterrupt, EOFError): print(f"\n\n  {Y('Cancelado.')}\n")
