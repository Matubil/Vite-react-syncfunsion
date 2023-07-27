import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { closest, isNullOrUndefined } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Filter, VirtualScroll, Sort } from '@syncfusion/ej2-react-grids';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { RatingComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from './sample-base';
import { DataManager, Query, UrlAdaptor } from '@syncfusion/ej2-data';
import { enableRipple } from '@syncfusion/ej2-base';
import { FabComponent } from "@syncfusion/ej2-react-buttons";
import AgregarBeneficiarioModal from './AgregarBeneficiarioModal';

enableRipple(true);


function statusTemplate(props) {
  React.useEffect(() => {
    updateSampleSection();
  }, []);
  return (<div>{props.Status === "Active" ?
    <div id="status" className="statustemp e-activecolor">
      <span className="statustxt e-activecolor">{props.Status}</span>
    </div> :
    <div id="status" className="statustemp e-inactivecolor">
      <span className="statustxt e-inactivecolor">{props.Status}</span>
    </div>}</div>);
}
function ratingTemplate(props) {
  return (<RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} />);
}
function progessTemplate(props) {
  let percentage = props[props.column.field];
  if (percentage <= 20) {
    percentage = percentage + 30;
  }
  return (<div id="myProgress" className="pbar">
    {props.Status === "Inactive" ?
      <div id="myBar" className="bar progressdisable" style={{ width: percentage + "%" }}>
        <div id="pbarlabel" className="barlabel">{percentage + "%"}</div>
      </div> :
      <div id="myBar" className="bar" style={{ width: percentage + "%" }}>
        <div id="pbarlabel" className="barlabel">{percentage + "%"}</div>
      </div>}
  </div>);
}
let loc = { width: '31px', height: '24px' };
function trustTemplate(props) {
  var Trustworthiness = props.Trustworthiness == "Sufficient" ? 'https://ej2.syncfusion.com/react/demos/src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'https://ej2.syncfusion.com/react/demos/src/grid/images/Insufficient.png' : 'https://ej2.syncfusion.com/react/demos/src/grid/images/Perfect.png';
  return (<div> <img style={loc} src={Trustworthiness} />
    <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function empTemplate(props) {
  return (<div>
    {props.EmployeeImg === 'usermale' ?
      <div className="empimg">
        <span className="e-userimg sf-icon-Male" />
      </div> :
      <div className="empimg">
        <span className="e-userimg sf-icon-FeMale" />
      </div>}
    <span id="Emptext">{props.Employees}</span>
  </div>);
}
function coltemplate(props) {
  return (<div className="Mapimage">
    <img src="https://ej2.syncfusion.com/react/demos/src/grid/images/Map.png" className="e-image" /> <span>  </span>
    <span id="locationtext">{props.Location}</span>
  </div>);
}
function trustdetails(props) {
  if (props.Trustworthiness === "Select All") {
    return (<span></span>);
  }
  let loc = { width: '31px', height: '24px' };
  let Trustworthiness = props.Trustworthiness == "Sufficient" ? 'https://ej2.syncfusion.com/react/demos/src/grid/images/Sufficient.png' : props.Trustworthiness == "Insufficient" ? 'https://ej2.syncfusion.com/react/demos/src/grid/images/Insufficient.png' : 'https://ej2.syncfusion.com/react/demos/src/grid/images/Perfect.png';
  return (<div><img style={loc} src={Trustworthiness} /> <span id="Trusttext">{props.Trustworthiness}</span></div>);
}
function ratingDetails(props) {
  return (<RatingComponent value={props.Rating} cssClass={'custom-rating'} readOnly={true} />);
}
function statusdetails(props) {
  if (props.Status === "Select All") {
    return (<span>Select All</span>);
  }
  if (props.Status === "Active") {
    return (<div className="statustemp e-activecolor">
      <span className="statustxt e-activecolor">Active</span>
    </div>);
  }
  if (props.Status === "Inactive") {
    return (<div className="statustemp e-inactivecolor">
      <span className="statustxt e-inactivecolor">Inactive</span>
    </div>);
  }
}
function OverView() {
  let dReady = false;
  let dtTime = false;
  let isDataBound = false;
  let isDataChanged = true;
  let intervalFun;
  let clrIntervalFun;
  let clrIntervalFun1;
  let clrIntervalFun2;
  let dropSlectedIndex = null;
  let ddObj;
  let gridInstance;
  let stTime;
  const ddlData = [
    { text: '1,000 Rows and 11 Columns', value: '1000' },
    { text: '10,000 Rows and 11 Columns', value: '10000' },
    { text: '100,000 Rows and 11 Columns', value: '100000' }
  ];

  // Agregar el estado para controlar el modal
  const [showModal, setShowModal] = React.useState(false);

  // Función para mostrar el modal
  const handleOpenModal = () => {
    setShowModal(true);
  };
  // Función para ocultar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const fields = { text: 'text', value: 'value' };
  function onDataBound() {
    clearTimeout(clrIntervalFun);
    clearInterval(intervalFun);
    dtTime = true;
  }
  function onComplete(args) {
    if (args.requestType === "filterchoicerequest") {
      if (args.filterModel.options.field === "Trustworthiness" || args.filterModel.options.field === "Rating" || args.filterModel.options.field === "Status") {
        var span = args.filterModel.dialogObj.element.querySelectorAll('.e-selectall')[0];
        if (!isNullOrUndefined(span)) {
          closest(span, '.e-ftrchk').classList.add("e-hide");
        }
      }
    }
  }
  const hostUrl = 'https://services.syncfusion.com/react/production/';
  const data = new DataManager({ url: hostUrl + 'api/UrlDataSource', adaptor: new UrlAdaptor });
  // console.log(data)
  const query = new Query().addParams('dataCount', '1000');
  function onChange() {
    ddObj.hidePopup();
    dropSlectedIndex = null;
    let index = ddObj.value;
    clearTimeout(clrIntervalFun2);
    clrIntervalFun2 = setTimeout(() => {
      isDataChanged = true;
      stTime = null;
      let contentElement = gridInstance.contentModule.getPanel().firstChild;
      contentElement.scrollLeft = 0;
      contentElement.scrollTop = 0;
      gridInstance.pageSettings.currentPage = 1;
      stTime = performance.now();
      if (gridInstance.query.params.length > 1) {
        for (let i = 0; i < gridInstance.query.params.length; i++) {
          if (gridInstance.query.params[i].key === 'dataCount') {
            gridInstance.query.params[i].value = index.toString();
            break;
          }
        }
      }
      else {
        gridInstance.query.params[0].value = index.toString();
      }
      gridInstance.setProperties({ dataSource: data });
    }, 100);
  }
  const check = {
    type: 'CheckBox'
  };
  const select = {
    persistSelection: true,
    type: "Multiple",
    checkboxOnly: true
  };
  function onLoad(args) {
    document.getElementById('overviewgrid').ej2_instances[0].on('data-ready', () => {
      dReady = true;
      stTime = performance.now();
    });
    document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
      if (dReady && stTime && isDataChanged) {
        let msgEle = document.getElementById('msg');
        let val = (performance.now() - stTime).toFixed(0);
        stTime = null;
        dReady = false;
        dtTime = false;
        isDataChanged = false;
        msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
        msgEle.classList.remove('e-hide');
      }
    });
  }
  const gridFilter = {
    type: 'Menu'
  };
  const status = {
    type: 'CheckBox',
    itemTemplate: statusdetails
  };
  const trust = {
    type: 'CheckBox',
    itemTemplate: trustdetails
  };
  const rating = {
    type: 'CheckBox',
    itemTemplate: ratingDetails
  };
  function accionesTemplate(props) {
    return (
      <div>
        <button className="e-icons e-edit-icon" title="Editar" onclick='editarBeneficiario()'><i class="fa-regular fa-pen-to-square"></i></button>
      </div>
    );
  }
  const handleClick = () => {
    grid.current.addRecord();
  };
  return (

    <div className='control-pane'>

      <div className='header-page'>
        <h1 className='header_page__title'>BENEFICIARIOS</h1>
        <div class="wrap">
          <button class="button" onClick={handleOpenModal}>Agregar Beneficiario</button>
          {/* <button class="button" onclick='agregarBeneficiario()'>Agregar Beneficiario</button> */}

        </div>
      </div>
      <div className='control-section'>
        <div style={{ paddingBottom: '18px', color: 'white' }}>
          <DropDownListComponent id="games" width='220' dataSource={ddlData} index={0} ref={(dropdownlist) => { ddObj = dropdownlist; }} fields={fields} className='buscador' change={onChange.bind(this)} placeholder="Select a Data Range" popupHeight="240px" />
          <span id='msg'></span>
          <br />
        </div>
        <GridComponent id="overviewgrid" dataSource={data} loadingIndicator={{ indicatorType: 'Shimmer' }} query={query} enableHover={false} enableVirtualization={true} rowHeight={38} height='400' ref={(g) => { gridInstance = g; }} actionComplete={onComplete.bind(this)} load={onLoad.bind(this)} dataBound={onDataBound.bind(this)} filterSettings={gridFilter} allowFiltering={true} allowSorting={true} allowSelection={true} selectionSettings={select} enableHeaderFocus={true}>
          <ColumnsDirective>
            {/* <ColumnDirective type='checkbox' allowSorting={false} allowFiltering={false} width='30'></ColumnDirective> */}
            {/* <ColumnDirective field='EmployeeID' visible={false} headerText='Employee ID' isPrimaryKey={true} width='120'></ColumnDirective> */}
            <ColumnDirective field='Employees' headerText='Nombre Benenficiario' width='180' clipMode='EllipsisWithTooltip' template={empTemplate} />
            <ColumnDirective field='CurrentSalary' headerText='Documento' width='100'></ColumnDirective>
            <ColumnDirective field='Mail' headerText='Mail' width='180'></ColumnDirective>
            <ColumnDirective field='Address' headerText='Direccion' width='150' clipMode="EllipsisWithTooltip"></ColumnDirective>
            <ColumnDirective field='Status' headerText='Activo' template={statusTemplate} width='110'></ColumnDirective>
            <ColumnDirective field='Acciones' headerText='Acciones' width='70' template={accionesTemplate} />
          </ColumnsDirective>
          <Inject services={[Filter, VirtualScroll, Sort]} />
        </GridComponent>
      </div>
      {/* Agrega el componente del modal aquí */}
      <AgregarBeneficiarioModal showModal={showModal} onClose={handleCloseModal} />
      <style>
        @import 'https://ej2.syncfusion.com/react/demos/src/grid/Grid/style.css';
      </style>
    </div>);
}

export default OverView;

const root = createRoot(document.getElementById('sample'));
root.render(<OverView />);