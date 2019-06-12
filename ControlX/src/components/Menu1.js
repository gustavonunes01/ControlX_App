import React, { Component } from "react";
import { Text, View} from "react-native";
import { Actions } from "react-native-router-flux";
import { Content, List, ListItem } from 'native-base';

export default class Menu1 extends Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'red', alingItems: 'center' }}>
                
                </View>
                <View style={{flex: 2}}>
                    <Content>
                        <List>
                            <ListItem>
                                <Text>Menu 1</Text>
                            </ListItem>
                            <ListItem>
                                <Text>Menu 2</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
            </View>
        )

    }
}