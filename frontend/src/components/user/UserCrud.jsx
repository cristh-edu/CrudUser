import React, {Component} from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://localhost:3001/users'
const initialState = {
    user: { name: '', email: ''},
    list: []
}
export default class UserCrud extends Component{

    state = {...initialState}

    componentWillMount(){
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }
    
    clear(){
        this.setState({user : initialState.user})
    }

    save(){
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp =>{
                const list = this.getUpdatedList(resp.data)
                this.setState({user: initialState.user, list})
            })
    }

    getUpdatedList(user, add=true) {
        const list = this.state.list.filter( u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <h3 className='text-center fw-bolder'>Formulário Usuário</h3>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className='form-control' 
                            name='name' 
                            value={this.state.user.name}  
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite o nome..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" className='form-control' 
                            name='email' 
                            value={this.state.user.email}  
                            onChange={e=>this.updateField(e)}
                            placeholder="Digite o e-mail..."
                            />
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary ms-2"
                            onClick={e=> this.save(e)}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ms-2"
                            onClick={e=> this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    load(user){
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`)
            .then( resp => {
                const list = this.getUpdatedList(user, false)
                this.setState({ list })
            })
    }

    renderTable(){
        return (
            <div className='table-responsive'>
                <h3 className='text-center mt-4 fw-bolder'>Tabela Usuário</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="col-1">ID</th>
                            <th className="col-5">Nome</th>
                            <th className="col-5">E-mail</th>
                            <th className="col-1 text-center" colspan="2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        )
    }

    renderRows(){
        return this.state.list.map(user=>{
            return(
                <tr key={user.id}>
                    <td className="col">{user.id}</td>
                    <td className="col">{user.name}</td>
                    <td className="col">{user.email}</td>
                    <td className="col">
                        <button className="btn btn-warning ms-2"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                    <td className="col">    
                        <button className="btn btn-danger ms-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}