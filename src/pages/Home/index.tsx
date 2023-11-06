import "./style.css"
import { Link } from "react-router-dom";

function Home() {

// Paranaue de TypeScript e retorna o HTML embaixo

    function MostraMenu() {

        let menu = document.getElementById("menu_links") as HTMLCanvasElement; // Obtém o elemento do menu pelo ID
        let sombra: any = document.getElementById("sombra"); // Obtém o elemento da sombra pelo ID
        let menu_barras: any = document.getElementById("menu_barras"); // Obtém o elemento do botão do menu pelo ID        
        let body: any = document.getElementsByTagName("body")[0]; // Obtém o elemento body (primeiro elemento)
        
        if (window.getComputedStyle(menu).left != "10px") { // Verifica se a propriedade 'left' do estilo computado do elemento do menu é diferente de 10px
            menu.style.left = "10px"; // Define a posição 'left' do menu como 10px movendo ele para direita
            sombra.style.right = "-10vw"; // Move a sombra para a direita
            menu_barras.setAttribute("aria-expanded", "true"); // Atualiza o atributo 'aria-expanded' para 'true'
            menu_barras.setAttribute("aria-label", "fechar menu"); // Atualiza o atributo 'aria-label' para 'fechar menu'
            body.style.overflow = "hidden"; // Define o overflow do body como "hidden" para evitar a rolagem da página
        } else {
            menu.style.left = "-300px"; // Esconde o menu deslocando-o para esquerda
            sombra.style.right = "110vw"; // Move a sombra para a esquerda para ocultá-la
            menu_barras.setAttribute("aria-expanded", "false"); // Atualiza o atributo 'aria-expanded' para 'false'
            menu_barras.setAttribute("aria-label", "abrir menu"); // Atualiza o atributo 'aria-label' para 'abrir menu'
            body.style.overflow = "auto"; // Restaura o overflow do body para o valor padrão (auto)
        }
        menu_barras.classList.toggle("ativo"); // Alterna a classe 'ativo' no botão do menu

    }


    return (
       <>
       
    <main className="main_home" id="main">
        <section className="banner">
            <div className="banner_conteudo">
                <span className="banner_slogan_l1">Lorem</span>
                <p className="banner_slogan_l2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <div className="banner_botoes">
                 <Link className="botao banner_botao_cad" to='CadastroEmpresa'>Cadastrar</Link>
                <Link className="botao banner_botao_cad" to='ListaEmpresas'>Empresas</Link>
                </div>
            </div>
            </section>
    </main>
       </>
        )
}

export default Home
