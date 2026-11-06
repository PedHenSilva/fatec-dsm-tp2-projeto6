// Sistema Legado
class LegacyDrinkSystem {
    // Retorna string no formato "Nome,Tamanho" com base em códigos numéricos legados
    getDrinkByCode(code) {
        const legacyDatabase = {
            101: "Refrigerante,300ml",
            102: "Refrigerante,500ml",
            103: "Refrigerante,700ml",
            201: "Suco,300ml",
            202: "Suco,500ml",
            203: "Suco,700ml"
        };
        return legacyDatabase[code] || "Desconhecido,Desconhecido";
    }
}

// 2. Padrão Adapter (Sistema Legado -> Interface de Bebida)
class DrinkAdapter {
    constructor(legacySystem) {
        this.legacySystem = legacySystem;
    }

    // Adapta a chamada do código legando e expõe as propriedades necessárias para o Bridge
    getDrinkFromLegacy(code) {
        const legacyData = this.legacySystem.getDrinkByCode(code);
        const [type, size] = legacyData.split(',');
        
        // Retorna um objeto que simula a estrutura das novas classes de Bebida
        return {
            name: type,
            size: size,
            getDescription: () => `${type} (${size})`
        };
    }
}

// Implementações Bridge (Bebidas e Batatas)

// Interface Abstrata para Bebida (Implementor)
class Drink {
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }
    getDescription() {
        return `${this.name} (${this.size})`;
    }
}

class Soda extends Drink {
    constructor(size) { super("Refrigerante", size); }
}

class Juice extends Drink {
    constructor(size) { super("Suco", size); }
}

// Interface Abstrata para Batata Frita (Implementor)
class Fries {
    constructor(size) {
        this.size = size;
    }
    getDescription() {
        return `Batata Frita ${this.size}`;
    }
}

// Padrão Bridge Abstração (Combo)
class Combo {
    constructor(burgerName, drinkImplementor, friesImplementor) {
        this.burger = burgerName;
        this.drink = drinkImplementor; // Ponte para Implementação de Bebida
        this.fries = friesImplementor; // Ponte para Implementação de Batata
    }

    // Métodos que permitem a personalização
    setDrink(newDrinkImplementor) {
        this.drink = newDrinkImplementor;
    }

    setFries(newFriesImplementor) {
        this.fries = newFriesImplementor;
    }

    exibir() {
        console.log(`🍔 Lanche: ${this.burger}`);
        console.log(`🥤 Bebida: ${this.drink.getDescription()}`);
        console.log(`🍟 Acompanhamento: ${this.fries.getDescription()}`);
        console.log('-'.repeat(40));
    }
}

// Testes

console.log("=== Iniciando montagem de combos ===\n");

// Instanciação do Sistema Legado e do Adapter
const legacySystem = new LegacyDrinkSystem();
const drinkAdapter = new DrinkAdapter(legacySystem);

// Montagem de 5 combos diferentes
console.log(">>> Criando 5 Combos Iniciais:\n");

const combo1 = new Combo("Big Mac", new Soda("500ml"), new Fries("Média"));
console.log("[Combo 1 de Fábrica]");
combo1.exibir();

const combo2 = new Combo("Quarteirão", new Juice("300ml"), new Fries("Pequena"));
console.log("[Combo 2 de Fábrica]");
combo2.exibir();

const combo3 = new Combo("McFish", new Soda("700ml"), new Fries("Grande"));
console.log("[Combo 3 de Fábrica]");
combo3.exibir();

const combo4 = new Combo("Big Mac", new Juice("500ml"), new Fries("Grande"));
console.log("[Combo 4 de Fábrica]");
combo4.exibir();

const combo5 = new Combo("Quarteirão", new Soda("300ml"), new Fries("Média"));
console.log("[Combo 5 de Fábrica]");
combo5.exibir();

// Alteração de combos existentes
console.log(">>> Customizando Combos Existentes (Modificação via Bridge):\n");

console.log("Alterando Combo 1: Upgrade de Batata (Média -> Grande) e Bebida (500ml -> Soda 700ml)");
combo1.setFries(new Fries("Grande"));
combo1.setDrink(new Soda("700ml"));
combo1.exibir();

console.log("Alterando Combo 2: Alterando Bebida para Suco 700ml");
combo2.setDrink(new Juice("700ml"));
combo2.exibir();

// Criação de um combo utilizando o adapter do sistema legado
console.log(">>> Integração com Sistema Legado via Adapter:\n");

// Buscando a bebida através do código legado
const bebidaLegadaAdaptada = drinkAdapter.getDrinkFromLegacy(202);

console.log(`Bebida recuperada do sistema legado pelo código 202: ${bebidaLegadaAdaptada.getDescription()}`);

const comboLegado = new Combo("McFish", bebidaLegadaAdaptada, new Fries("Média"));
console.log("[Combo Montado com Sucesso utilizando o Adapter]");
comboLegado.exibir();
