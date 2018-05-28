import React from 'react';
import { green } from 'material-colors';
import { View, Item, Text, Input, Icon, Spinner, Textarea } from 'native-base';
import { MT_10, FLEX_1 } from '../../../util/styles';
import { THEME } from '../../../theme';

export default function renderInput({
    input, 
    styles: {
        fieldContainer,
        field, 
        fieldInput, 
        fieldText,
        fieldErrorText,
        spinnerColor
    }, 
    type, 
    rowSpan,
    placeHolder,
    label, 
    bordered,
    noValidate,
    meta: { 
        error, 
        asyncValidating, 
        touched, 
        valid 
    },
    isFirst
}) {
    let hasError = false;
    const isValid = !!(!asyncValidating && touched && valid && input.value);
    
    if (error !== undefined) {
        hasError = true;
    }

    return ( 
        <View style={[isFirst ? {} : MT_10, fieldContainer]}>
            <Item 
                error={hasError}
                style={field}
            >
                {
                    !!(label && label.length) && (
                        <Text style={fieldText}>{label}</Text>
                    )
                }
                {
                    type === 'textarea' ? (
                        <Textarea 
                            bordered={bordered}
                            style={fieldInput}
                            {...input}
                            rowSpan={rowSpan}
                            placeholder={placeHolder}
                        />
                    ) : (
                        <Input 
                            {...input} 
                            style={fieldInput} 
                            placeholder={placeHolder}                            
                            secureTextEntry={type === 'password'}
                        />
                    )
                }
                { 
                    (!noValidate && isValid) && (
                        <Icon name='ios-checkmark-circle' style={{ color: green['500'] }} />
                    ) 
                }
                { 
                    (!noValidate && hasError) && (
                        <Icon name='ios-close-circle' style={{ color: THEME.ERROR_TEXT }} />
                     )
                }
                { 
                    asyncValidating && (
                        <Spinner color={spinnerColor} />
                    )
                }
            </Item>

            {
                (!noValidate && hasError) && (
                    <View style={FLEX_1}>
                        <Text style={fieldErrorText}>{error}</Text>
                    </View> 
                )
            }
        </View>
    );
}
