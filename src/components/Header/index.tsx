import logo from "../../assets/img/logo.svg";
import "./style.css"
import {Link} from "react-router-dom"

function Header() {
    function mostrarMenu() {

        let menu: any = document.getElementById("menu_links");
        let sombra: any = document.getElementById("sombra");
        let menu_barras: any = document.getElementById("menu_barras");

        let body = document.getElementsByTagName("body")[0];

        if (window.getComputedStyle(menu).left != "10px") {
            menu.style.left = "10px";
            sombra.style.right = "-10vw";
            menu_barras.setAttribute("aria-expanded", "true");
            menu_barras.setAttribute("aria-label", "fechar menu");
            body.style.overflow = "hidden";
        } else {
            menu.style.left = "-300px";
            sombra.style.right = "110vw";
            menu_barras.setAttribute("aria-expanded", "false");
            menu_barras.setAttribute("aria-label", "abrir menu");
            body.style.overflow = "auto";
        }
        menu_barras.classList.toggle("ativo");
    }

    return (
        <>
            <div id="sombra"></div>
            <header>
                <div className="container header_conteudo">
                    <a className="menu_barras" id="menu_barras" aria-label="abrir menu" aria-expanded="false" aria-controls="menu_links" aria-haspopup="true" onClick={mostrarMenu} href="#"><div className="barras"></div></a>
                    <img className="header_logo" src={logo} alt="" />
                    <nav>
                        <div id="menu_links" className="menu_links">
                           <Link to='/'>Home</Link>
                           <Link to='CadastroEmpresa'>Cadastrar</Link>
                           <Link to='ListaEmpresas'>Lista de Empresas</Link>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}
export default Header;