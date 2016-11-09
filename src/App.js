import React, { Component } from 'react';
import axios from 'axios';
//import logo from './logo.svg';
import Table from 'rc-table';
import './App.css';

function formatName() {
  return 'MemeCoin Stats';
}

function sortByGamble(a,b) {
  if (a.NetGamble < b.NetGamble)
    return 1;
  if (a.NetGamble > b.NetGamble)
    return -1;
  return 0;
}

function sortByCurrent(a,b) {
  if (a.CurMoney < b.CurMoney)
    return 1;
  if (a.CurMoney > b.CurMoney)
    return -1;
  return 0;
}

function sortByProduction(a,b) {
  if (a.Production < b.Production)
    return 1;
  if (a.Production > b.Production)
    return -1;
  return 0;
}

function sortByName(a,b) {
  var textA = a.Username.toUpperCase();
  var textB = b.Username.toUpperCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

class Users extends Component {
  constructor(props) {
    super(props);

    this.handleGambleSort = this.handleGambleSort.bind(this);
    this.handleCurrentSort = this.handleCurrentSort.bind(this);
    this.handleNameSort = this.handleNameSort.bind(this);
    this.handleProductionSort = this.handleProductionSort.bind(this);

    this.state = {data: [{Username: "hello"}], sortState: 'Current'}
    axios.get('http://memeapi.sophisticasean.com:8080/users')
      .then((result) => {
         var newData = result.data
         newData.forEach(function(user) {
            user.NetGamble = (user.WonMoney - user.LostMoney)
            user.Production = (((user.Miner*1)+(user.Robot*60)+(user.Swarm*3600)+(user.Fracker*216000))/10)
            if (user.Username.indexOf("Trump") !== -1) {
              user.Username = "Str8 Memer"
            }
            if (user.Username.indexOf("dick") !== -1) {
              user.Username = "Big Rick"
            }
            if (user.Username.indexOf("Bong") !== -1) {
              user.Username = "Darth Bane"
            }
            if (user.Username.indexOf("Pipe") !== -1) {
              user.Username = "Darth Plagus"
            }
          })
         this.setState({data: newData})
      }
    )
  }

  handleGambleSort() {
    this.setState({sortState: 'NetGamble'});
  }

  handleCurrentSort() {
    this.setState({sortState: 'Current'});
  }

  handleNameSort() {
    this.setState({sortState: 'Name'});
  }

  handleProductionSort() {
    this.setState({sortState: 'Production'});
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
    } else {
      data = this.state.data
    }
    //data.unshift({
      //NetGamble: <GambleSortButton onClick={this.handleGambleSort} />,
      //CurMoney: <CurrentSortButton onClick={this.handleCurrentSort} />,
      //Username: <NameSortButton onClick={this.handleNameSort} />,

   //})

     var columns = [{
      title: 'Discord ID', dataIndex: 'DID', key: 'DID', width: 100
      },{
      title: <NameSortButton onClick={this.handleNameSort} />, dataIndex: 'Username', key: 'Username', width: 100
      },{
      title: <CurrentSortButton onClick={this.handleCurrentSort} />, dataIndex: 'CurMoney', key: 'CurMoney', width: 100
      },{
      title: <GambleSortButton onClick={this.handleGambleSort} />, dataIndex: 'NetGamble', key: 'NetGamble', width: 100
      },{
      title: <ProductionSortButton onClick={this.handleProductionSort} />, dataIndex: 'Production', key: 'Production', width: 100
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
    <button onClick={props.onClick}>
      Net Gambling Balance
    </button>
  );
}
function CurrentSortButton(props) {
  return (
    <button onClick={props.onClick}>
      Current Memes
    </button>
  );
}
function NameSortButton(props) {
  return (
    <button onClick={props.onClick}>
      Username
    </button>
  );
}
function ProductionSortButton(props) {
  return (
    <button onClick={props.onClick}>
      Production
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
        <div className="Some-data">
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
