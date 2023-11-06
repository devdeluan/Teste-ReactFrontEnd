import "./style.css";
import Alterar from "../../assets/img/img_editar.png"
import Excluir from "../../assets/img/img_excluir.png"


export default function CardEmpresa(props: any) {
  function parseListaEmpresa() {
    if (typeof props.id === "string") {
      return JSON.parse(props.id);
    } else {
      return props.id;
    }
  }

  return (
    <>
      <div id="card_listas">
        <tbody>
          <tr className="linhaTabela">
            <td>{props.nomeEmpresa}</td>
            <td>{props.cnpj}</td>
            <td>55+ {props.telefone}</td>
            <td>{props.email}</td>
            <td className="td_uf_cidade">{props.cidade}</td>
          </tr>
        </tbody>
      </div>
    </>
  );
}
