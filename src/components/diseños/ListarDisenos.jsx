import BotonCambioEstado from "../chared/BotonCambioEstado";
import BotonNegro from "../chared/BotonNegro";

const ListarDisenos = () => {
  return (
      <div className='tabla'>
          <table className='table caption-top '>
              <caption>Lista de diseños</caption>
              <thead>
                  <tr>
                      <th scope='col'>Id</th>
                      <th scope='col'>Nombre</th>
                      <th scope='col'>Ver imagen</th>
                      <th scope='col'>Publicado</th>
                      <th scope='col'>Inhabilitar</th>
                      <th scope='col'>Editar</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <th scope='row'>001</th>
                      <td>Vaca</td>
                      <td>
                          <BotonNegro text='Ver' modalToOpen='#modalDetalles' />
                      </td>
                      <td>
                          <BotonCambioEstado />
                      </td>
                      <td>
                          <BotonCambioEstado />
                      </td>
                      <td>
                          <BotonNegro
                              text='Editar'
                              modalToOpen={'#modalDiseño'}
                          />
                      </td>
                  </tr>
                  <tr>
                      <th scope='row'>002</th>
                      <td>Batman Logo</td>
                      <td>
                          <BotonNegro text='Ver' modalToOpen='#modalDetalles' />
                      </td>
                      <td>
                          <BotonCambioEstado />
                      </td>
                      <td>
                          <BotonCambioEstado />
                      </td>
                      <td>
                          <BotonNegro
                              text='Editar'
                              modalToOpen={'#modalDiseño'}
                          />
                      </td>
                  </tr>
                  <tr>
                      <th scope='row'>003</th>
                      <td>Vaca</td>
                      <td>
                          <BotonNegro text='Ver' modalToOpen='#modalDetalles' />
                      </td>
                      <td>
                          <BotonCambioEstado />
                      </td>
                      <td>
                          <BotonCambioEstado />
                      </td>
                      <td>
                          <BotonNegro
                              text='Editar'
                              modalToOpen={'#modalDiseño'}
                          />
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  );
}

export default ListarDisenos
