import useMovimientos from "../../hooks/useMovimientos";
import CancelarModal from "../chared/CancelarModal";
import HeaderModals from "../chared/HeaderModals";

export const Notificacion = () => {
  const { movimiento } = useMovimientos();

  return (
    <>
      <div className="modal " id="staticBackdrop">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <HeaderModals title="Notificaciones " />
            <div className="modal-body">
              {movimiento.slice().reverse().map((Notificar) => (
                <div>
                  <br />
                  <div className="card text-center">
                    <div className="card-header">{Notificar.fecha} </div>
                    <div className="card-body">
                      <p className="card-text">{Notificar.descripcion} </p>
                    </div>
                    <div className="card-footer text-muted">{Notificar.ID}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <CancelarModal name={"Cerrar"} modalToCancel="myModal" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notificacion;
