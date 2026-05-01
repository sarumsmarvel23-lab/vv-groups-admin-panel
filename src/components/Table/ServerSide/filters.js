import React from "react";
import PropTypes from "prop-types";
import { CFormInput, CFormSelect } from "@coreui/react";

// Define a default UI for filtering
export function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormInput
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search`}
    />
  );
}

export function StatusColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"new"}>New</option>
      <option value={"pending"}>Pending</option>
      <option value={"completed"}>Completed</option>
      <option value={"processing"}>Processing</option>
      <option value={"rejected"}>Rejected</option>
    </CFormSelect>
  );
}

export function isMakerColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"true"}>Yes</option>
      <option value={"false"}>No</option>
     
    </CFormSelect>
  );
}

export function directionFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"closed_yes"}>Closed Yes</option>
      <option value={"closed_no"}>Closed No</option>
     
    </CFormSelect>
  );
}

export function passbookFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"fiat_deposit"}>Fiat Deposit</option>
      <option value={"crypto_deposit"}>Crypto Deposit</option>
      <option value={"fiat_withdraw"}>Admin Withdraw</option>
      <option value={"buy_process"}>Buy Process</option>
      <option value={"sell_process"}>Sell Process</option>
      <option value={"crypto_withdraw"}>Crypto Withdraw</option>
     
    </CFormSelect>
  );
}

export function bannerFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={""}>All</option>
      <option value={true}>Active</option>
      <option value={false}>Inactive</option>
     
    </CFormSelect>
  );
}

export function admin_depositStatusFilter({
  column: { filterValue, setFilter },
}) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"credit"}>Credit</option>
      <option value={"partially paid"}>Partially Paid</option>
      <option value={"completely paid"}>Completely Paid</option>
    </CFormSelect>
  );
}
export function StatusBooleanFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={""}>All</option>
      <option value={true}>Active</option>
      <option value={false}>Inactive</option>
    </CFormSelect>
  );
}
export function IBStatusFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"pending"}>Pending</option>
      <option value={"reject"}>Reject</option>
    </CFormSelect>
  );
}

export function orderStatusFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"open"}>Open</option>
      <option value={"active"}>Active</option>
      <option value={"closed"}>Closed</option>
      <option value={"cancelled"}>Cancelled</option>
    </CFormSelect>
  );
}
export function PassbookTypeFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"coin_deposit"}>Coin Deposit</option>
      <option value={"coin_withdraw"}>Coin Withdraw</option>
      <option value={"fiat_deposit"}>Fiat Deposit</option>
      <option value={"fiat_withdraw"}>Fiat Withdraw</option>
      <option value={"admin_deposit"}>Admin Deposit</option>
      <option value={"admin_withdraw"}>Admin Withdraw</option>
      <option value={"main_to_trading"}>Main to Trading</option>
      <option value={"trading_to_main"}>Trading to Main</option>
    </CFormSelect>
  );
}
export function DepositStatusFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"new"}>New</option>
      <option value={"completed"}>Completed</option>
      <option value={"pending"}>Pending</option>
      <option value={"rejected"}>Rejected</option>
    </CFormSelect>
  );
}
export function RewardStatus({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"active"}>Active</option>
      <option value={"inactive"}>In-active</option>
    </CFormSelect>
  );
}
export function RewardedStatus({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"true"}>Rewarded</option>
      <option value={"false"}>Not Rewarded</option>
    </CFormSelect>
  );
}

export function DepositPaymentType({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"coin_deposit"}>Crypto</option>
      <option value={"fiat_deposit"}>Fiat</option>
      <option value={"admin_deposit"}>Admin</option>
    </CFormSelect>
  );
}
export function ScalpingMinute({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={""}>All</option>
      <option value={1}>less than 1 minute</option>
      <option value={2}>less than 2 minute</option>
      <option value={3}>less than 3 minute</option>
    </CFormSelect>
  );
}
export function CabinetType({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={""}>All</option>
      <option value={'client'}>Client</option>
      <option value={'partner'}>Partner</option>
    </CFormSelect>
  );
}

export function BuyOrSell({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"buy"}>Buy</option>
      <option value={"sell"}>Sell</option>
    </CFormSelect>
  );
}
export function WithdrawPaymentType({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"."}>All</option>
      <option value={"coin_withdraw"}>Crypto</option>
      <option value={"fiat_withdraw"}>Fiat</option>
      <option value={"admin_withdraw"}>Admin</option>
    </CFormSelect>
  );
}
export function stakeOrderTypeFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"flexible"}>Flexible</option>

      <option value={"fixed"}>Fixed</option>
    </CFormSelect>
  );
}

export function withdrawSourceTypeFilter({
  column: { filterValue, setFilter },
}) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"spotBal"}>Main</option>
      <option value={"commission"}>Commission</option>
      <option value={"pammcommission"}>Pammcommission</option>
      {/* <option value={"mt5-deposit"}>MT5 Deposit</option>
      <option value={"mt5-withdraw"}>MT5 Withdraw</option> */}
    </CFormSelect>
  );
}

export function stakesettleTypeFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"redemption"}>Redemption</option>
      <option value={"interest"}>Interest</option>
    </CFormSelect>
  );
}
export function ContactUsFilter({ column: { filterValue, setFilter } }) {
  return (
    <CFormSelect
      onChange={e => {
        setFilter(e.target.value || "");
      }}
      value={filterValue}
    >
      <option value={"all"}>All</option>
      <option value={"pending"}>Pending</option>
      <option value={"replied"}>Replied</option>
    </CFormSelect>
  );
}
DefaultColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
RewardStatus.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
RewardedStatus.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

StatusColumnFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

PassbookTypeFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

stakeOrderTypeFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
stakesettleTypeFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
DepositStatusFilter.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

DepositPaymentType.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

WithdrawPaymentType.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};

BuyOrSell.propTypes = {
  column: PropTypes.shape({
    filterValue: PropTypes.string,
    setFilter: PropTypes.func.isRequired,
  }),
};
