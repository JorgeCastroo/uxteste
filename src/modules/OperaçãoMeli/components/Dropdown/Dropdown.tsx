import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown as Input } from 'react-native-element-dropdown';

import * as S from './styles';

interface Data {
  label: string;
  value: number;
}

interface DropdownProps {
  data: Data[] | undefined;
  label: string;
  onSelect?: (value: number) => void;
  error?: boolean;
  search?: boolean;
}

export const Dropdown = ({
  data,
  label,
  error = false,
  search = false,
  onSelect,
}: DropdownProps) => {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('' as any);

  return (
    <S.Container>
      <Text
        style={[
          styles.label,
          error ? { color: 'red' } : focused && { color: 'blue' },
        ]}>
        {label}
      </Text>
      <Input
        style={[
          styles.dropdown,
          error ? { borderColor: 'red' } : focused && { borderColor: 'blue' },
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={[styles.selectedTextStyle, error && { color: 'red' }]}
        inputSearchStyle={[styles.inputSearchStyle, error && { color: 'red' }]}
        iconStyle={styles.iconStyle}
        data={data ? data : []}
        search={search}
        placeholder={!focused ? 'Selecione' : '...'}
        searchPlaceholder="Pesquise..."
        maxHeight={300}
        value={value}
        labelField="label"
        valueField="value"
        onChange={item => {
          setValue(item.value);
          setFocused(true);
          onSelect && onSelect(item.value);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      {error && <Text style={styles.labelError}>Origem e destino iguais</Text>}
    </S.Container>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'blue',
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#F5F5F5',
    left: 22,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  labelError: {
    position: 'absolute',
    backgroundColor: '#F5F5F5',
    color: 'red',
    left: 22,
    bottom: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
