import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Text, List, ListItem, View, Icon } from 'native-base';
import { FLEX_1, FLEX_5, ML_20, ML_10, FLEX_2, MT_10, MT_5 } from '../../../util/styles';
import { THEME } from '../../../theme';
import { SERVER_URL } from '../../../services/constant.service';

const routes = [
    {
        title: 'Home',
        icon: 'home'
    }, 
    {
        title: 'Settings',
        icon: 'settings'
    }
];

class SideBar extends React.Component {
    render() {
        const { user } = this.props;

        return (
            <View style={FLEX_1}>
                <View style={[FLEX_2, { backgroundColor: THEME.PRIMARY }]}>
                    <View style={FLEX_1} />
                    <View style={FLEX_2}>
                        <View style={[ML_20]}>
                            <Image 
                                style={{ height: 60, width: 60, borderRadius: 30 }} 
                                source={{ uri: `${SERVER_URL}/${user.profilePictureUrl}` }} 
                            />
                        </View>
                        <View style={[ML_20, MT_5]}>
                            <Text style={{ color: THEME.TEXT_LIGHT }}>{user.username}</Text>
                            <Text style={{ color: THEME.TEXT_LIGHT }}>{user.email}</Text>
                        </View>
                    </View>
                </View>
                <View style={FLEX_5}>
                    <List
                        dataArray={routes}
                        renderRow={(data) => {
                            const { title, icon } = data;

                            return (
                                <ListItem
                                    button
                                    onPress={() => this.props.navigation.navigate(title)}
                                >
                                    <Icon name={icon} style={{ fontSize: 20 }} />
                                    <Text style={ML_20}>{title}</Text>
                                </ListItem>
                            );
                        }}
                    />
                </View>
            </View>
        );
  }
}

const mapStateToProps = ({ user }) => ({
    user,
});

export default connect(mapStateToProps)(SideBar);
