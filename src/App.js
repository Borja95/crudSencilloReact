import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
];

const sectores = [{
  id:1,sector:"VIP",precio_unitario:"10000"
},
{
  id:2,sector:"Platea",precio_unitario:"7000"
},
{
  id:3,sector:"Campo",precio_unitario:"3000"
}]

class App extends React.Component {
  state = {
    data: sectores,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      sector: "",
      precio_unitario: ""
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].sector = dato.sector;
        arreglo[contador].precio_unitario = dato.precio_unitario;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  onInputChange = (e) => {
    const precio = e.target.value
    console.log(precio)
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Sector</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.sector}</td>
                  <td>{}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
              className="btn btn-success"
            >
              Comprar
            </Button>
        </Container>



        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Sector: 
              </label>
              <input
                className="form-control"
                name="sector"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.sector}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Precio Unitario: 
              </label>
              <input
                className="form-control"
                name="precio_unitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.precio_unitario}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cantidad}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Total: 
              </label>
              <input
                className="form-control"
                name="total"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.cantidad*this.state.form.precio_unitario}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Entrada</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Sector: 
              </label>
              <select className='form-control' name='sectorSelected' onChange={this.onInputChange}>
                  {
                      
this.state.data.map
( element => 
                      <option key={element.id} value={element.precio_unitario}>
                        {element.sector}
                      </option>)
                  }
                </select> 
            </FormGroup>
            
            <FormGroup>
              <label>
                Precio Unitario: 
              </label>
              <input
                className="form-control"
                name="preciounitario"
                type="text"
                onChange={this.onInputChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <input
                className="form-control"
                name="cantidad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Total: 
              </label>
              <input
                className="form-control"
                name="total"
                type="text"
                value={this.state.form.cantidad*this.state.form.precio_unitario}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>

          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
