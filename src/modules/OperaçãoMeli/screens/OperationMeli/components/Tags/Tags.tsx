import React, {Children, useState} from 'react';

import * as S from './styles';

import {TypeTagsRead} from '../../../../services/useScanCode';
import {useActions} from '../../../../services/useActions';
import Feather from 'react-native-vector-icons/Feather';

import {RadioButton} from 'react-native-paper';
import {Alert, Dimensions, View} from 'react-native';

type TagsProps = {
  data: TypeTagsRead[] | undefined | null;
};

export const TagsGroup = ({data}: TagsProps) => {
  const {removeItem, removeItens} = useActions();
  const [remove, setRemove] = useState(false);
  const [removeItensList, setRemoveItensList] = useState<TypeTagsRead[]>([]);

  const {height} = Dimensions.get('window');

  const handleRemove = async () => {
    const formatItens = await removeItensList.map(item => {
      return {Id: item.idRomaneioItemMeli};
    });

    removeItens(formatItens);
    setRemoveItensList([]);
  };

  return (
    <>
      {data && (
        <View
          style={{
            height: height * 0.5,
          }}>
          {data?.length > 0 && (
            <S.SectionButton>
              <S.Button
                onPress={() => {
                  setRemove(!remove);
                  setRemoveItensList([]);
                }}>
                <S.ButtonLabel>
                  {remove ? 'Cancelar' : 'Selecionar'}
                </S.ButtonLabel>
              </S.Button>
            </S.SectionButton>
          )}

          <S.Scroll>
            {Children.toArray(
              data?.map(item => (
                <S.CardContainer>
                  <S.RowContainer>
                    <S.Tag>{item.tagHU}</S.Tag>
                    {!remove ? (
                      <Feather
                        onPress={() => {
                          Alert.alert('Atenção', 'Deseja remover esse item?', [
                            {text: 'Não', style: 'cancel'},
                            {
                              text: 'Sim',
                              onPress: () => {
                                removeItem({Id: item.idRomaneioItemMeli});
                              },
                            },
                          ]);
                        }}
                        name="trash-2"
                        size={24}
                        color={'red'}
                        style={{marginLeft: 5, padding: 5}}
                      />
                    ) : (
                      <RadioButton
                        value="first"
                        status={
                          removeItensList.includes(item)
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => {
                          if (removeItensList.includes(item)) {
                            setRemoveItensList(
                              removeItensList.filter(i => i !== item),
                            );
                          } else {
                            setRemoveItensList([...removeItensList, item]);
                          }
                        }}
                      />
                    )}
                  </S.RowContainer>
                </S.CardContainer>
              )),
            )}
          </S.Scroll>
          {removeItensList.length > 0 && (
            <S.SectionButton>
              <S.Button
                onPress={() => {
                  Alert.alert('Atenção', 'Deseja remover esse item?', [
                    {text: 'Não', style: 'cancel'},
                    {
                      text: 'Sim',
                      onPress: () => {
                        handleRemove();
                      },
                    },
                  ]);
                }}>
                <S.ButtonLabelDanger>Remover Itens</S.ButtonLabelDanger>
              </S.Button>
            </S.SectionButton>
          )}
        </View>
      )}
    </>
  );
};
