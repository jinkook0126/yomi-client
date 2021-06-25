import React from 'react';
import { TextInput } from 'react-native';

import styled, {css} from 'styled-components/native';

export default ()=>{
    return (
        <StyledTextInput secureTextEntry={true} />
    )
}

const StyledTextInput = styled.TextInput`
  border: 1px solid red;
  font-family: 'Cafe24Oneprettynight';
`;