import React, { Component } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import Table from 'rc-table';
import './App.css';

function formatName() {
  return 'MemeCoin Stats';
}

function sortByGamble(a,b) {
  var ang = parseFloat(a.NetGamble.replace(/,/g,''));
  var bng = parseFloat(b.NetGamble.replace(/,/g,''));
  if (ang < bng)
    return 1;
  if (ang > bng)
    return -1;
  return 0;
}

function sortByCurrent(a,b) {
  var acr = parseFloat(a.CurMoney.replace(/,/g,''));
  var bcr = parseFloat(b.CurMoney.replace(/,/g,''));
  if (acr < bcr)
    return 1;
  if (acr > bcr)
    return -1;
  return 0;
}

function sortByProduction(a,b) {
  var ap = parseFloat(a.Production.replace(/,/g,''));
  var bp = parseFloat(b.Production.replace(/,/g,''));
  if (ap < bp)
    return 1;
  if (ap > bp)
    return -1;
  return 0;
}

function sortByRank(a,b) {
  var apl = parseFloat(a.PrestigeLevel.replace(/,/g,''));
  var bpl = parseFloat(b.PrestigeLevel.replace(/,/g,''));
  var ap = parseFloat(a.Production.replace(/,/g,''));
  var bp = parseFloat(b.Production.replace(/,/g,''));
  if (apl < bpl)
    return 1;
  if (apl > bpl)
    return -1;
  if (ap < bp)
    return 1;
  if (ap > bp)
    return -1;
  return 0;
}

function sortByName(a,b) {
  var textA = a.Username.toUpperCase();
  var textB = b.Username.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

class Stats extends Component {
  constructor(props) {
    super(props);

    this.state = {data: [{TotalUsers: "0"}]};
    axios.get('https://sophisticasean.com/meme_coin/stats')
      .then((result) => {
         var newData = result.data
         newData.forEach(function(stat) {
            stat.TotalUsers = stat.TotalUsers.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            stat.TotalUsers90 = stat.TotalUsers90.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            stat.TotalTransactions = stat.TotalTransactions.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            stat.TotalTransactions90 = stat.TotalTransactions90.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
          })
         this.setState({data: newData});
      }
    )
  }

  render() {
    var data = this.state.data;

     var columns = [{
      title: 'Total Users', dataIndex: 'TotalUsers', key: 'TotalUsers', width: 100
      },{
      title: 'Total Users (last 90 days)', dataIndex: 'TotalUsers90', key: 'TotalUsers90', width: 100
      },{
      title: 'Total Transactions', dataIndex: 'TotalTransactions', key: 'TotalTransactions', width: 101
      },{
      title: 'Total Transactions (last 90 days)', dataIndex: 'TotalTransactions90', key: 'TotalTransactions90', width: 101
    }]
    return (<div>
      <Table columns={columns} data={data} />
    </div>
    );
  }
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.handleGambleSort = this.handleGambleSort.bind(this);
    this.handleCurrentSort = this.handleCurrentSort.bind(this);
    this.handleNameSort = this.handleNameSort.bind(this);
    this.handleProductionSort = this.handleProductionSort.bind(this);
    this.handleRankSort = this.handleRankSort.bind(this);

    this.state = {data: [{Username: "hello"}], sortState: 'Current'}
    axios.get('https://sophisticasean.com/meme_coin/users')
      .then((result) => {
         var newData = result.data
         newData.forEach(function(user) {
            user.NetGamble = (user.WonMoney - user.LostMoney)
            user.Production = (((user.Miner*1)+(user.Robot*60)+(user.Swarm*3600)+(user.Fracker*216000))/10)
            //if (user.DID == "150882846318395392")
              //user.PrestigeLevel = "99999999999999 lvl MEME DADDY"
            if (user.Username.length > 15) {
              user.Username = user.Username.substring(0,15);
            };
            if (user.DID == "185709415545044992") {
              user.Username = "rekt"
            };
            // format the numbers with commas
            user.Username = user.Username.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.PrestigeLevel = user.PrestigeLevel.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.Production = user.Production.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.CurMoney = user.CurMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.NetGamble = user.NetGamble.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.RecMoney = user.RecMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.GiveMoney = user.GiveMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.EarMoney = user.EarMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.CollectedMoney = user.CollectedMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.SpentMoney = user.SpentMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.HackedMoney = user.HackedMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
            user.StolenFromMoney = user.StolenFromMoney.toLocaleString(navigator.language, { minimumFractionDigits: 0 });
          })
         this.setState({data: newData})
      }
    )
  }

  handleGambleSort() {
    this.setState({
      sortState: 'NetGamble',
      gambleActive: 'active',
      currentActive: '',
      nameActive: '',
      productionActive: '',
      rankActive: '',
    });
  }

  handleCurrentSort() {
    this.setState({
      sortState: 'Current',
      gambleActive: '',
      currentActive: 'active',
      nameActive: '',
      productionActive: '',
      rankActive: '',
    });
  }

  handleNameSort() {
    this.setState({
      sortState: 'Name',
      gambleActive: '',
      currentActive: '',
      nameActive: 'active',
      productionActive: '',
      rankActive: '',
    });
  }

  handleProductionSort() {
    this.setState({
      sortState: 'Production',
      gambleActive: '',
      currentActive: '',
      nameActive: '',
      productionActive: 'active',
      rankActive: '',
    });
  }

  handleRankSort() {
    this.setState({
      sortState: 'Rank',
      gambleActive: '',
      currentActive: '',
      nameActive: '',
      productionActive: '',
      rankActive: 'active',
    });
  }

  render() {
    const sortState = this.state.sortState;
    var oldData = this.state.data.slice();

    let data = null;
    if (sortState === 'Current') {
      data = oldData.sort(sortByCurrent)
    } else if (sortState === 'NetGamble') {
      data = oldData.sort(sortByGamble)
    } else if (sortState === 'Name') {
      data = oldData.sort(sortByName)
    } else if (sortState === 'Production') {
      data = oldData.sort(sortByProduction)
    } else if (sortState === 'Rank') {
      data = oldData.sort(sortByRank)
    } else {
      data = this.state.data
    }

     var columns = [{
      title: 'Discord ID', dataIndex: 'DID', key: 'DID', width: 100
      },{
      title: <NameSortButton className={this.state.nameActive} onClick={this.handleNameSort} />, dataIndex: 'Username', key: 'Username', width: 100
      },{
      title: <RankSortButton className={this.state.rankActive} onClick={this.handleRankSort} />, dataIndex: 'PrestigeLevel', key: 'PrestigeLevel', width: 50
      },{
      title: <ProductionSortButton className={this.state.productionActive} onClick={this.handleProductionSort} />, dataIndex: 'Production', key: 'Production', width: 100
      },{
      title: <CurrentSortButton className={this.state.currentActive} onClick={this.handleCurrentSort} />, dataIndex: 'CurMoney', key: 'CurMoney', width: 100
      },{
      title: <GambleSortButton className={this.state.gambleActive} onClick={this.handleGambleSort} />, dataIndex: 'NetGamble', key: 'NetGamble', width: 100
      },{
      title: 'TippedMemeGain', dataIndex: 'RecMoney', key: 'RecMoney', width: 100
      },{
      title: 'TippedMemeLoss', dataIndex: 'GiveMoney', key: 'GiveMoney', width: 100
      },{
      title: 'Mined Memes', dataIndex: 'EarMoney', key: 'EarMoney', width: 100
      },{
      title: 'Collected Memes', dataIndex: 'CollectedMoney', key: 'CollectedMoney', width: 100
      },{
      title: 'Memes Spent on Units', dataIndex: 'SpentMoney', key: 'SpentMoney', width: 100
      },{
      title: 'HackingMemeGain', dataIndex: 'HackedMoney', key: 'HackedMoney', width: 100
      },{
      title: 'HackingMemeLoss', dataIndex: 'StolenFromMoney', key: 'StolenFromMoney', width: 101
    }]
    return (<div>
      <Table columns={columns} data={data} />
    </div>
    );
  }
}

function GambleSortButton(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      Net Gambling Balance
    </button>
  );
}
function CurrentSortButton(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      Current Memes
    </button>
  );
}
function NameSortButton(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      Username
    </button>
  );
}
function ProductionSortButton(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      Production
    </button>
  );
}
function RankSortButton(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
    >
      PrestigeRank
    </button>
  );
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="https://media2.giphy.com/media/l41lQukP8YbqrJfgs/200_s.gif" className="App-logo" alt="logo" />
          <h1>{formatName()}</h1>
        </div>
        <div className="BotStats-Header">
          <Stats />
        </div>
        <div className="Some-data">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
