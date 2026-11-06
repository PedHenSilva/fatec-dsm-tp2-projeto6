# 🍔 Fast-Food Combo Customizer (Bridge & Adapter)

### FATEC Diadema - Luigi Papaiz
**Curso:** Tecnologia em Desenvolvimento de Software Multiplataforma  
**Disciplina:** Técnicas de Programação II
**Contexto:** Projeto Prático Acadêmico – Avaliação de Padrões Estruturais GoF  

---

A aplicação simula o sistema de personalização de combos de uma rede de fast-food (estilo McDonald's), permitindo a montagem flexível de pedidos contendo um lanche, uma bebida e uma porção de batata frita.

A arquitetura utiliza **Programação Orientada a Objetos (POO)** em JavaScript (Node.js) para integrar de forma harmônica os padrões estruturais **Bridge** e **Adapter**, atendendo às especificações solicitadas em aula.

---

## 🛠️ Padrões de Projeto Implementados

### 1. Padrão Bridge (Ponte)
* **Objetivo:** Separar a Abstração da sua Implementação, permitindo que elas variem de forma independente.
* **Aplicação no Projeto:** A classe `Combo` atua como a abstração principal. Em vez de criar subclasses engessadas para cada combinação possível de itens (ex: `BigMacComSucoGrandeEBatataMedia`), o combo utiliza a **composição** para se conectar às interfaces de `Drink` (Bebida) e `Fries` (Batata Frita). Isso possibilita alterar os tamanhos e tipos de bebidas ou batatas em tempo de execução sem modificar a estrutura do lanche.
* **Classes Relacionadas:** `Combo` (Abstração), `Drink`, `Soda`, `Juice` e `Fries` (Implementadores).

### 2. Padrão Adapter (Adaptador)
* **Objetivo:** Converter a interface de uma classe em outra interface esperada pelos clientes, permitindo que classes com interfaces incompatíveis trabalhem juntas.
* **Aplicação no Projeto:** A rede de fast-food possui um sistema de bebidas legado (`LegacyDrinkSystem`) que identifica produtos estritamente por códigos numéricos (ex: `101` para Refrigerante 300ml, `202` para Suco 500ml). Para integrar esse sistema antigo ao novo ecossistema sem alterar o código original, foi criada a classe `DrinkAdapter`. Ela traduz as consultas numéricas antigas no formato de objeto que a abstração `Combo` espera consumir.
* **Classes Relacionadas:** `LegacyDrinkSystem` (Adaptee/Classe Adaptada) e `DrinkAdapter` (Adapter/Adaptador).

---

## 📂 Estrutura do Repositório

```text
├── index.js          # Código-fonte principal com a lógica dos padrões e testes
└── README.md         # Documentação e evidências de execução do projeto
```

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o [Node.js](https://nodejs.org) instalado em sua máquina.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com
   ```
2. **Navegue até a pasta do projeto:**
   ```bash
   cd NOME_DO_REPOSITORIO
   ```
3. **Execute o programa:**
   ```bash
   node index.js
   ```
