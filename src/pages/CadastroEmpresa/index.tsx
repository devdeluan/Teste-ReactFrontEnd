import React, { useState, FormEvent, ChangeEvent } from 'react';
import api from '../../utils/api';
import "./style.css"

function CadastroEmpresa() {
  // Variáveis de estado para os campos do formulário
  const [nome, setNome] = useState<string>("");
  const [nomeEmpresa, setNomeEmpresa] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [logradouro, setLogradouro] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [uf, setUf] = useState<string>("");

  // Variável de estado para as informações do endereço
  const [endereco, setEndereco] = useState({
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
  });

  // Função para lidar com o CEP digitado
  const handleCepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCep(cep); // Atualiza o estado 'cep' com o valor limpo

    if (cep.length === 8) {
      // Se o CEP tiver 8 dígitos, faz uma chamada à API ViaCEP para buscar informações
      api.get(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          const data = response.data;

          // Atualiza o estado 'endereco' com as informações do endereço
          setEndereco({
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          });
        })
        .catch((error) => {
          console.error('Erro ao buscar o endereço:', error);
          // Em caso de erro na chamada da API, limpa as informações do endereço
          setEndereco({
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
          });
        });
    } else {
      // Se o CEP não tiver 8 dígitos, limpa as informações do endereço
      setEndereco({
        logradouro: '',
        bairro: '',
        cidade: '',
        uf: '',
      });
    }
  };

  // Funções para máscaras de CEP, CNPJ e telefone
  function mascaraCep(event: React.ChangeEvent<HTMLInputElement>) {
    let valorDigitado = event.target.value;
    if (!valorDigitado) return "";
    valorDigitado = valorDigitado.replace(/\D/g, "");
    valorDigitado = valorDigitado.replace(/(\d{5})(\d)/, "$1-$2");
    event.target.value = valorDigitado;
  }

  function mascaraCnpj(event: React.ChangeEvent<HTMLInputElement>) {
    let valorDigitado = event.target.value;
    if (!valorDigitado) return "";
    valorDigitado = valorDigitado.replace(/\D/g, "");
    valorDigitado = valorDigitado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})(\d)/, "$1.$2.$3/$4-$5");
    event.target.value = valorDigitado;
  }

  function mascaraTel(event: React.ChangeEvent<HTMLInputElement>) {
    let valorDigitado = event.target.value;
    if (!valorDigitado) return "";
    valorDigitado = valorDigitado.replace(/\D/g, "");
    valorDigitado = valorDigitado.replace(/(\d{2})(\d{5})(\d{4})(\d)/, "($1) $2-$3");
    event.target.value = valorDigitado;
  }

  // Função para lidar com o envio do formulário
  function cadastrarEmpresa(event: React.FormEvent) {
    event.preventDefault();

    // Cria um objeto FormData com os dados do formulário
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("nomeEmpresa", nomeEmpresa);
    formData.append("cnpj", cnpj);
    formData.append("email", email);
    formData.append("telefone", telefone);
    formData.append("senha", senha);
    formData.append("cep", cep);
    formData.append("logradouro", endereco.logradouro); // Use as informações do endereço do estado 'endereco'
    formData.append("numero", numero);
    formData.append("bairro", endereco.bairro); // Use as informações do endereço do estado 'endereco'
    formData.append("cidade", endereco.cidade); // Use as informações do endereço do estado 'endereco'
    formData.append("uf", endereco.uf); // Use as informações do endereço do estado 'endereco'

    // Faz a chamada à API para cadastrar a empresa
    api
      .post("empresas", formData)
      .then((response) => {
        console.log(response);
        alert("Empresa cadastrada com sucesso!");
      })
      .catch((error) => {
        console.error(error);
        alert("Ocorreu um erro no cadastro da empresa.");
      });
  }

  return (
    <main className="main_cadastro">
      <div className="container container_cad">
        <div className="cad_conteudo">
          <h1>Crie seu cadastro</h1>
          <form onSubmit={cadastrarEmpresa} className="cad_formulario" method="POST">
            <div className="cad_box_input">
              <label htmlFor="nome">Nome completo</label>
              <input
                type="text"
                id="nome"
                onChange={(event) => setNome(event.target.value)}
                placeholder=""
                required
              />
            </div>
            <div className="cad_box_input">
              <label htmlFor="nomeEmpresa">Nome da empresa</label>
              <input
                type="text"
                id="nomeEmpresa"
                onChange={(event) => setNomeEmpresa(event.target.value)}
                placeholder=""
                required
              />
            </div>

            <div className="cad_box_input">
              <label htmlFor="cnpj">CNPJ</label>
              <input
                type="text"
                minLength={18}
                maxLength={18}
                onKeyUp={mascaraCnpj}
                onChange={(event) => setCnpj(event.target.value)}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>

            <div className="cad_box_input">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                id="telefone"
                maxLength={14}
                onKeyUp={mascaraTel}
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="(00) 00000-0000"
                required
              />
            </div>

            <div className="cad_box_input">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder=""
                required
              />
            </div>

            <div className="cad_box_input">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                maxLength={9}
                onKeyUp={mascaraCep}
                onChange={handleCepChange} // Chama a função de autocomplete de CEP
                placeholder="Digite aqui seu CEP:"
                required
              />
            </div>

            <div className="cad_box_input">
              <label htmlFor="logradouro">Logradouro</label>
              <input
                type="text"
                id="logradouro"
                value={endereco.logradouro} // Preenchido automaticamente pelo autocomplete
                onChange={(event) => setLogradouro(event.target.value)}
                placeholder="Digite aqui seu Logradouro:"
                required
              />
            </div>

            <div className="cad_linha1_input">
              <div className="cad_box_input2">
                <label htmlFor="numero">Número</label>
                <input
                  type="text"
                  id="numero"
                  onChange={(event) => setNumero(event.target.value)}
                  placeholder="Digite o Nº:"
                  required
                />
              </div>

              <div className="cad_box_input2">
                <label htmlFor="bairro">Bairro</label>
                <input
                  type="text"
                  id="bairro"
                  value={endereco.bairro} // Preenchido automaticamente pelo autocomplete
                  onChange={(event) => setBairro(event.target.value)}
                  placeholder="Digite aqui seu Bairro:"
                  required
                />
              </div>
            </div>

            <div className="cad_linha2_input">
              <div className="cad_box_input2">
                <label htmlFor="cidade">Cidade</label>
                <input
                  type="text"
                  id="cidade"
                  value={endereco.cidade} // Preenchido automaticamente pelo autocomplete
                  onChange={(event) => setCidade(event.target.value)}
                  placeholder="Digite aqui sua Cidade:"
                  required
                />
              </div>

              <div className="cad_box_input2">
                <label className="cad_uf" htmlFor="uf">UF</label>
                <input
                  className="input"
                  type="text"
                  id="uf"
                  value={endereco.uf} // Preenchido automaticamente pelo autocomplete
                  onChange={(event) => setUf(event.target.value)}
                  placeholder="Digite a UF:"
                  required
                />
              </div>
            </div>
            <button type="submit" className="cad_botao">Cadastrar</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default CadastroEmpresa;
