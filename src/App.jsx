import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';

function App() {
  const [count, setCount] = useState(0)
  const data = [
    {
      Matricula: 10248, Nombre: 'VINET', FarmaId: 5, ShipCountry: 'France', Freight: 32.38
    },
    {
      Matricula: 10249, Nombre: 'TOMSP', FarmaId: 6, ShipCountry: 'Germany', Freight: 11.61
    },
    {
      Matricula: 10250, Nombre: 'HANAR', FarmaId: 4, ShipCountry: 'Brazil', Freight: 65.83
    }
  ];
  return (
    <>
      
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <GridComponent dataSource={data}>
        <ColumnsDirective>
          <ColumnDirective field='Matricula' width='100' textAlign="Right" />
          <ColumnDirective field='Nombre' width='100' />
          <ColumnDirective field='FarmaId' width='100' textAlign="Right" />
          <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right" />
          <ColumnDirective field='ShipCountry' width='100' />
        </ColumnsDirective>
      </GridComponent>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>


  )
}

export default App

