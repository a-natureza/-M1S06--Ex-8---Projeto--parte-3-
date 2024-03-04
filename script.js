document.addEventListener("DOMContentLoaded", function() {
    const botaoConsultarCep = document.getElementById('consultarCep');

    botaoConsultarCep.addEventListener('click', function() {
        // Verifica se já existe um endereço salvo e pergunta se o usuário quer buscar um novo
        const enderecoSalvo = localStorage.getItem("endereco");
        if (enderecoSalvo) {
            const desejaNovoEndereco = confirm("Já existe um endereço salvo. Deseja buscar um novo endereço?");
            if (!desejaNovoEndereco) {
                return; // Se o usuário não quiser um novo endereço, para a execução
            }
        }

        let cep = prompt("Digite seu CEP: ");
        if (!cep) return; // Se o CEP não for fornecido, retorna

        fetch(`https://viacep.com.br/ws/${cep}/json`, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    alert("CEP não encontrado.");
                    return;
                }

                const enderecoFormatado = `${data.logradouro}, ${data.complemento} - ${data.bairro} - ${data.localidade}/${data.uf}`;
                const confirmacao = confirm(`O endereço está correto? ${enderecoFormatado}`);

                if (confirmacao) {
                    localStorage.setItem("endereco", JSON.stringify(data));
                    alert("Endereço salvo com sucesso!");
                }
            })
            .catch(error => console.error("Falha na requisição", error));
    });
});
