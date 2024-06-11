import { useState } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '../styles/main.css'
export const TableNotValid = ({ data, columns, filterList }) => {
  const [currentPage, setcurrentPage] = useState(1)
  const [productsPerPage] = useState(5)

  const indexlastProduct = currentPage * productsPerPage
  const indexFirstProduct = indexlastProduct - productsPerPage
  const currentProducts = filterList.slice(indexFirstProduct, indexlastProduct)
  const paginate = (pageNumber) => setcurrentPage(pageNumber)

  return (
    <div className="container-fluid mt-3">
      <div className="d-flex justify-content-center">
        <div className="table-responsive-sm">
          <table className="table align-middle table-hover table-bordered text-center shadow p-3 mb-5 bg-body-tertiary rounded fixed-width-column " style={{ maxWidth: '100%' }}>

            <thead className='table-dark'>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="fixed-width-column">{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className='text-center'>
                    ¡No hay registros en el sistema!
                  </td>
                </tr>
              ) : (
                currentProducts.map((item, rowIndex) => (
                  <tr key={rowIndex} className="fixed-height-row">
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className="fixed-width-column">{column.render(item)}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={columns.length}>
                  <div className="d-flex justify-content-end me-5">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <button className="page-link" onClick={() => setcurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                          </button>
                        </li>
                        {Array.from({ length: Math.ceil(filterList.length / productsPerPage) }).map((_, index) => (
                          <li key={index} className="page-item">
                            <button onClick={() => paginate(index + 1)} className='page-link'>
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li className="page-item">
                          <button className="page-link" onClick={() => setcurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filterList.length / productsPerPage)}>
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
