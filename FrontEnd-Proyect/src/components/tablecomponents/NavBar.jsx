import { NavLink, useLocation } from "react-router-dom"



export const NavBar = () =>{

  const locate = useLocation()

  let title = ''

  switch(locate.pathname){
    case '/':
      title = 'Registro de clientes'
      break
    case '/other':
      title ='En producción'
      break
    case '/clients':
      title ='Registro de Clientes'
      break
    case '/providers':
      title = 'Registro de Provedores'
      break
    default:
      title ='Texto no definido'
      break
  }


  return (
    <div className="container-fluid">
      <div className="row mt-3 justify-content-md-start shadow-sm p-3">
        <div className="col-2">
          <button className="btn ms-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <i className="fa-solid fa-bars fa-2xl"></i>
          </button>
        </div>
        <div className="col-8">
          <div className="h2 text-center">{title}</div>
        </div>
      </div>
      
      <div className="offcanvas offcanvas-start bg-light " data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div className="offcanvas-header  m-3">
          <span className="h3 text-center">Menu Administracion </span>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>

        </div>
        <div className="offcanvas-body bg-light">
         
        <div className="sidebar">
            <ul>
              <li className="list-group-item mb-3  ">
                <NavLink className="text-decoration-none fs-6 py-3 rounded w-100 d-inline-block p-2" activeclassname='active' to='/'><i className="fa-solid fa-house me-2"></i>Inicio</NavLink>
              </li>
              <li className="list-group-item mb-3  ">
                <NavLink className="text-decoration-none fs-6 py-3 rounded w-100 d-inline-block p-2" activeclassname='active' to='/other'><i className="fa-solid fa-house me-2"></i>Otro</NavLink>
              </li>

            </ul>
        </div>
           
    
        </div>
        </div>
      </div>


   
  )
}
