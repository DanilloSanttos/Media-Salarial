function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valor);
}

function calcularEExibirResultados() {
    var inputFuncionarios = document.getElementById("funcionarios").value;
    var linhas = inputFuncionarios.split("\n");

    var funcionarios = linhas.map(function (linha) {
        var partes = linha.split(":");
        return {
            nome: partes[0].trim(),
            salario: parseFloat(partes[1].trim()),
        };
    });

    if (funcionarios.length === 0 || linhas[0] === "") {
        document.getElementById("resultado").innerText = "Por favor, insira pelo menos um funcionário.";
        return;
    }

    var totalSalarios = funcionarios.reduce(function (total, funcionario) {
        return total + funcionario.salario;
    }, 0);

    var mediaSalarial = totalSalarios / funcionarios.length;

    document.getElementById("resultado").innerText =
        `Média Salarial: ${formatarMoeda(mediaSalarial)}`;
    document.getElementById("resultado").innerText +=
        `\nTotal de Salários: ${formatarMoeda(totalSalarios)}`;
    document.getElementById("resultado").innerText +=
        `\nQuantidade de Funcionários: ${funcionarios.length}`;

    funcionarios.sort(function (a, b) {
        return b.salario - a.salario;
    });

    var tresMaioresSalarios = funcionarios.slice(0, 3);

    document.getElementById("resultado").innerText +=
        "\nTrês Funcionários com Maiores Salários:\n";
    tresMaioresSalarios.forEach(function (funcionario) {
        document.getElementById("resultado").innerText += `${funcionario.nome}: ${formatarMoeda(funcionario.salario)}\n`;
    });

    document.getElementById("resultado").classList.add("fadeIn");
}

function exibirCadastro() {
    document.getElementById("cadastroFuncionario").style.display = "block";
}

function cadastrarFuncionario() {
    var nomeCadastro = document.getElementById("nomeCadastro").value;
    var salarioCadastro = parseFloat(document.getElementById("salarioCadastro").value);

    if (!nomeCadastro || isNaN(salarioCadastro)) {
        alert("Por favor, preencha o nome e o salário corretamente.");
        return;
    }

    var textareaFuncionarios = document.getElementById("funcionarios");
    textareaFuncionarios.value += `\n${nomeCadastro}:${salarioCadastro}`;

    document.getElementById("nomeCadastro").value = "";
    document.getElementById("salarioCadastro").value = "";
    document.getElementById("cadastroFuncionario").style.display = "none";
}
function salvarResultados() {
    var resultado = document.getElementById("resultado").innerText;
    var blob = new Blob([resultado], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'resultados.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}