import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { withNavigation } from 'react-navigation';
import { 
  Header,
  Title,
  Button,
  Icon,
  View,
  Left,
  Body,
  Right,
  Item,
  Input
} from 'native-base';

import { ML_10, FLEX_1, FLEX_5, VERTICALLY_CENTER } from '../../../util/styles';
import Styles from './styles';
import { THEME } from '../../../theme';
import { REDUX_FORM_KEYS } from '../../../services/constant.service';

class AppBarComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchMode: false
        };

        this.searchTrigger = (
            <Button 
                key='search' 
                transparent 
                onPress={() => { this.setState({ searchMode: true }); }}
            >
                <Icon name="search" style={{ color: THEME.TEXT_LIGHT }} />
            </Button>
        );

        this.getTitle = this.getTitle.bind(this);
        this.goBack = this.goBack.bind(this);
        this.openDrawer = this.openDrawer.bind(this);
        this.searchBarRenderer = this.searchBarRenderer.bind(this);
    }

    getTitle() {
        const {
            navigation,
            title
        } = this.props;

        return title || navigation.state.routeName;
    }

    goBack() {
        this.props.navigation.goBack();
    }

    openDrawer() {
        this.props.navigation.navigate('DrawerOpen');
    }

    searchBarRenderer({ input, reset }) {
        return ( 
            <View style={[FLEX_1, { flexDirection: 'row' }]}>
                <View style={VERTICALLY_CENTER}>
                    <Icon name="search" style={{ color: THEME.TEXT_LIGHT }} />
                </View>

                <Input
                    {...input}
                    style={[FLEX_5, { color: THEME.TEXT_LIGHT }]}
                    placeholderTextColor={THEME.TEXT_LIGHT}
                    placeholder="Search"
                />
                
                <View style={VERTICALLY_CENTER}>
                    <Button
                        transparent
                        style={FLEX_1}
                        onPress={() => { reset(); this.setState({ searchMode: false }); }}
                    >
                        <Icon name="close" style={{ color: THEME.TEXT_LIGHT }} />
                    </Button>       
                </View>
            </View>
        );
    }

    render() {
        const { goBack, additionalButton, isSearchable, reset } = this.props;
        const { searchMode } = this.state;
        let buttons = additionalButton;

        if (buttons && isSearchable) {
            buttons = [this.searchTrigger].concat(buttons);
        }

        const backButton = (
            <Button transparent onPress={this.goBack}>
                <Icon style={{ color: THEME.TEXT_LIGHT }} name='arrow-back' />
            </Button>
        );

        const menuButton = (
            <Button transparent onPress={this.openDrawer}>
                <Icon 
                    style={{ color: THEME.TEXT_LIGHT }} 
                    name='menu' 
                />
            </Button>
        );

        if (searchMode) {
            return (
                <Header 
                    search={searchMode}
                    androidStatusBarColor={THEME.PRIMARY}
                    style={{ backgroundColor: THEME.PRIMARY }}
                >
                    <View style={[Styles.searchContainer]}>
                        <Item style={FLEX_5}>
                            <Field 
                                name='searchValue'
                                type='text'
                                component={this.searchBarRenderer}
                                reset={reset}
                            />
                        </Item>
                    </View>
                </Header>
            );
        } 

        return (
            <Header 
                search={searchMode}
                androidStatusBarColor={THEME.PRIMARY}
                style={{ backgroundColor: THEME.PRIMARY }}
            >
                <View style={Styles.container}>
                    <Left style={FLEX_1}>
                        <View>
                            { goBack ? backButton : menuButton }
                        </View>
                    </Left>
                    <Body style={FLEX_1}>
                        <View style={Styles.title}>
                            <Title style={ML_10}>{this.getTitle()}</Title>
                        </View>
                    </Body>
                    <Right style={FLEX_1}>
                        <View style={{ flexDirection: 'row' }}>
                            { buttons || null }
                        </View>
                    </Right>
                </View>

            </Header>
        );
    }
}


const reduxedAppBar = reduxForm({
    form: REDUX_FORM_KEYS.SEARCH_BAR,
})(AppBarComponent);

const componentWithNavigation = withNavigation(reduxedAppBar);

export default componentWithNavigation;
