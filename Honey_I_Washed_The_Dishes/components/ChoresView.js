'use strict';

var React = require('react-native');
var {
        ListView,
        StyleSheet,
        Text,
        View,
        } = React;

var choresStub = [
  {
    title : 'Wash the dishes',
    points: 5
  },
  {
    title : 'Vacuum carpet in the livin\' room',
    points: 4
  }
];

var ChoresView = React.createClass({

  getInitialState() {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(choresStub),
    }
  },

  render() {
    console.log('chore row');
    return (
        <ListView
            dataSource={this.state.dataSource}
            contentInset={{top: 100}}
            renderRow={(chore, r, i) => this._renderRow(chore)}
            onChangeVisibleRows={this._onChangeRows}
            />
    );
  },

  _renderRow(chore) {
    console.log('chore', chore)
    return (
        <View style={styles.row}>
          <Text>{chore.points} - </Text>
          <Text>{chore.title}</Text>
        </View>
    );
  }

});


var styles = {
  container: {
    flex           : 1,
    justifyContent : 'center',
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },

  row: {
    flex         : 1,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomColor: '#ededed',
    borderBottomWidth: 1
  }

};

module.exports = ChoresView;
