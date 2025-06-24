import React from "react";
import { MovementVm } from './movement-list.vm';
import { AppLayout } from "@/layouts";
import classes from "./movement-list.page.module.css";
import { MovementListTableComponent} from  './components';
import { getMovementList } from "./api";
import { mapAccountListFromApiToVm } from "./movement-list.mapper";
import { useParams } from 'react-router-dom';


export const MovementListPage: React.FC = () => {
  const [movementList, setMovementList] = React.useState <MovementVm[]>([]);

const { id } = useParams <{ id: string }>();

  React.useEffect(() => {
    if (id) {
      getMovementList(id).then(result => {
      setMovementList(mapAccountListFromApiToVm(result));
      console.log(result);
    });
    }
  }, [id]);

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