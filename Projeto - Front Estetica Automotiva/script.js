const API_URL = "http://localhost:3000";

function abrirLogin() {
    document.getElementById("login-modal")?.classList.add("active");
}

function fecharLogin() {
    document.getElementById("login-modal")?.classList.remove("active");
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("login-email").value;
        const senha = document.getElementById("login-senha").value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) throw new Error("Erro ao realizar login.");

            mostrarToast("Login enviado!");
            fecharLogin();
        } catch (error) {
            console.error(error);
            mostrarToast("Erro ao realizar login.");
        }
    });
}

function selecionarPlano(nomePlano) {
    mostrarToast(`Plano "${nomePlano}" selecionado!`);
    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
}

const agendamentoForm = document.getElementById("agendamento-form");
if (agendamentoForm) {
    agendamentoForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const servico = document.getElementById("servico").value;
        const data = document.getElementById("data").value;
        const hora = document.getElementById("hora").value;

        if (!nome || !telefone || !servico || !data || !hora) {
            mostrarToast("Preencha todos os campos.");
            return;
        }

        const agendamento = {
            nome,
            telefone,
            servico,
            data,
            hora,
            status: "PENDENTE"
        };

        try {
            const response = await fetch(`${API_URL}/agendamentos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(agendamento)
            });

            if (!response.ok) throw new Error("Erro ao realizar agendamento.");

            mostrarToast("Agendamento realizado com sucesso!");
            this.reset();
        } catch (error) {
            console.error(error);
            mostrarToast("Erro ao realizar agendamento.");
        }
    });
}

let carrinho = [];

function adicionarCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
    document.getElementById("cart")?.classList.add("active");
    mostrarToast(`${nome} adicionado ao carrinho`);
}

function atualizarCarrinho() {
    const container = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!container || !totalElement) return;

    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalElement.textContent = "R$ 0,00";
        return;
    }

    let total = 0;

    carrinho.forEach((produto, index) => {
        total += produto.preco;

        const item = document.createElement("div");
        item.className = "cart-item";
        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong><br>
                <small>R$ ${formatarPreco(produto.preco)}</small>
            </div>
            <button onclick="removerCarrinho(${index})" style="border:none;background:none;cursor:pointer;" title="Remover produto">🗑️</button>
        `;

        container.appendChild(item);
    });

    totalElement.textContent = `R$ ${formatarPreco(total)}`;
}

function removerCarrinho(index) {
    if (index < 0 || index >= carrinho.length) return;
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function fecharCarrinho() {
    document.getElementById("cart")?.classList.remove("active");
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarToast("Seu carrinho está vazio.");
        return;
    }

    mostrarToast("Pedido enviado com sucesso!");
    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = mensagem;
    toast.classList.add("active");

    setTimeout(() => {
        toast.classList.remove("active");
    }, 3000);
}

function formatarPreco(valor) {
    return valor.toFixed(2).replace(".", ",");
}

async function carregarProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) throw new Error("Erro ao carregar produtos.");
        const produtos = await response.json();
        console.log("Produtos carregados:", produtos);
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const campoData = document.getElementById("data");
    if (campoData) {
        campoData.min = new Date().toISOString().split("T")[0];
    }

    const loginModal = document.getElementById("login-modal");
    if (loginModal) {
        loginModal.addEventListener("click", function (event) {
            if (event.target === this) fecharLogin();
        });
    }

    carregarProdutos();
    atualizarCarrinho();
});