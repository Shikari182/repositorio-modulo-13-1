import React from "react";
import { MovementVm } from './movement-list.vm';
import { AppLayout } from "@/layouts";
import classes from "./movement-list.page.module.css";
import { MovementListTableComponent} from  './components';
import { getMovementList } from "./api";
import { mapAccountListFromApiToVm } from "./movement-list.mapper";


export const MovementListPage: React.FC = () => {
  const [movementList, setMovementList] = React.useState <MovementVm[]>([]);

  React.useEffect(() => {
    getMovementList().then(result => {
      setMovementList(mapAccountListFromApiToVm(result))
      console.log(result);
    })
  }, [])

  return (
    <AppLayout>
      <div className={classes.root}>
      <div className={classes.headerContainer}>
        <h1>Saldos y Últimos Movimientos</h1>
        
        </div>
        <MovementListTableComponent movementList={movementList}/>
        </div>
    </AppLayout>
  )
}