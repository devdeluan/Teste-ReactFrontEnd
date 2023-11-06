import CardEmpresa from "../../components/CardLista";
import api from "../../utils/api";
import { useEffect, useState } from "react";
import "./style.css";
import search from "../../assets/img/search.png";


export default Empresa;

function Empresa() {


  const [emp, setEmpresa] = useState<any[]>([]);

  //state filtros com os filtros definidos
  const [filtros, setFiltros] = useState<string[]>([
    "CNPJ"
  ]);

  // state que contém a opção de filtro selecionado pelo usuário
  const [select, setSelect] = useState<string>(""); 

  const [filtroDigitado, setfiltroDigitado] = useState<string>("");

  const [listaBuscaFiltrado, setlistaBuscaFiltrado] = useState<any[]>(emp);

  useEffect(() => {
    document.title = "Lista de Empresas";

    listarEmpresas();
  }, []);

  function buscarPor(event: any) {
    event.preventDefault();

    console.log(select);
    console.log(emp);
    console.log(filtroDigitado);

    let empFiltrados = [];

  if (select == "CNPJ") {
      empFiltrados = emp.filter((ep: any) =>
        ep.cnpj.includes(filtroDigitado.toLocaleUpperCase())
      );
    } 

    if (empFiltrados.length === 0) {
      alert("Nenhum resultado encontrado!!");
    } else {
      setlistaBuscaFiltrado(empFiltrados);
    }
  }

  function retornoEquipGeral(event: any) {
    if (event.target.value === "") {
      setlistaBuscaFiltrado(emp);
    }
    setfiltroDigitado(event.target.value);
  }

  function listarEmpresas() {
    api.get("Empresas").then((resposta: any) => {
      console.log(resposta.data);
      setEmpresa(resposta.data);
    });
  }

  function alternarCoresTabela() {
    let linhas = document.getElementsByTagName("tr"); // Obtém todas as linhas da tabela

    for (let i = 1; i < linhas.length; i++) {
      if (i % 2 === 0) {
        // Se o índice da linha for par
        linhas[i].style.backgroundColor = "#dceee8 ";
      } else {
        // Se o índice da linha for ímpar
        linhas[i].style.backgroundColor = "#eaf5f5"; 
      }

      // Verifica se a linha possui a classe "tabelaEmp2"
      if (linhas[i].classList.contains("tabelaEmp2")) {
        linhas[i].style.backgroundColor = "white";
      }
    }
  }

  alternarCoresTabela();

  return (
    <>
        <main className="main_listaEmpresa">
          <section className="Empresas">
            <div className="painel_emp">
              <form method="post" onSubmit={buscarPor}>
                <section className="table__header">
                  <h1>Lista de Empresas</h1>
                  <select
                    defaultValue={"DEFAULT"}
                    name=""
                    id="cad_select_opcao"
                    onChange={(e) => setSelect(e.target.value)}
                  >
                    <option selected value="DEFAULT" disabled>
                      Selecione
                    </option>
                    {filtros.map((equip: any, index: number) => {
                      return (
                        <option key={index} value={equip}>
                          {equip}
                        </option>
                      );
                    })}
                  </select>

                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Procurar "
                      onChange={retornoEquipGeral}
                    />
                    <button className="pesquisar" type="submit">
                      <img src={search} alt="" />
                    </button>
                  </div>
                </section>
              </form>

              <table className="tabelaEmp">
                <thead>
                  <tr>
                    <th scope="col">Empresa</th>
                    <th scope="col">CNPJ</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Email</th>
                    <th className="th_cidade" scope="col">Cidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="tabelaEmp2">
                    {listaBuscaFiltrado.length === 0
                      ? emp.map((equip: any, index: number) => {
                          return (
                            <td key={index}>
                              <CardEmpresa
                                nomeEmpresa={equip.nomeEmpresa}
                                cnpj={equip.cnpj}
                                telefone={equip.telefone}
                                email={equip.email}
                                cidade={equip.cidade}
                                uf={equip.uf}
                              />
                            </td>
                          );
                        })
                      : listaBuscaFiltrado.map((equip: any, index: number) => {
                          return (
                            <td key={index}>
                              <CardEmpresa
                                nomeEmpresa={equip.nomeEmpresa}
                                cnpj={equip.cnpj}
                                telefone={equip.telefone}
                                email={equip.email}
                                cidade={equip.cidade}
                                uf={equip.uf}
                              />
                            </td>
                          );
                        })}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
    </>
  );
}
