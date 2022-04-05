import React from "react";
import Main from "../template/Main";
import imgHome from "../../assets/imgs/home.png"

export default props =>
    <Main icon='home' title='Início' subtitle='Segundo Projeto do Capítulo de React'>
        <div className="row">
            <div className="col-md-6 col-sm-12">
                <img className="img-fluid" src={imgHome}/>
            </div>
            <div className="col-md-6 col-sm-12 d-flex align-self-center"> 
                <div className="text-center col-md-10 offset-md-1">
                    <h1 className="fw-bolder">Bem Vindo!</h1>
                    <hr />
                    <span>
                        Esse é o Crud de usuários feito com o objetivo de estudar a estrutura do React.
                    </span>
                </div>
            </div>
        </div>
    </Main>