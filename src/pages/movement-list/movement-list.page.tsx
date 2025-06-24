import React from "react";
import { MovementVm } from "./movement-list.vm";
import { AppLayout } from "@/layouts";
import classes from "./movement-list.page.module.css";
import { MovementListTableComponent } from "./components";
import { getMovementList } from "./api";
import { mapMovementListFromApiToVm } from "./movement-list.mapper";
import { useParams } from "react-router-dom";
import { getAccountList } from "../account-list/api/account-list.api";
import { Account } from "../account-list/api/account-list.api-model";

export const MovementListPage: React.FC = () => {
  const [movementList, setMovementList] = React.useState<MovementVm[]>([]);
  const [account, setAccount] = React.useState<Account | null>(null);

  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    if (!id) return;

    getMovementList(id).then((result) => {
      setMovementList(mapMovementListFromApiToVm(result));
    });

    getAccountList().then((accounts) => {
      const acct = accounts.find((a) => a.id === id);
      if (acct) {
        setAccount(acct);
      }
    });
  }, [id]);

  return (
    <AppLayout>
      <div className={classes.root}>
        <div className={classes.headerContainer}>
          <h1>Saldos y Últimos Movimientos</h1>
          {account && (
            <div className={classes.balanceAvailable}>
              <div className={classes.balanceLabel}>SALDO DISPONIBLE</div>
              <div className={classes.balanceValue}>
                {account.balance} €
              </div>
            </div>
          )}
        </div>

        {account && (
          <div className={classes.accountInfo}>
            <span className={classes.alias}>Alias: {account.name}</span>
            <span className={classes.iban}>IBAN: {account.iban}</span>
          </div>
        )}

        <MovementListTableComponent movementList={movementList} />
      </div>
    </AppLayout>
  );
};
