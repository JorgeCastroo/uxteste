import React, {useMemo, useState} from 'react';
import {RefreshControl, SafeAreaView, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScreenRenderProps} from './types';
import {Wrapper} from './styles';
import themes from '../../../styles/themes';
import toPixel from '../../../utils/toPixel';

const Render: React.FC<ScreenRenderProps> = ({
  children,
  align,
  wrapperColor,
  statusBarMargin,
  paddingBottom,
  onRefresh,
  loadingColor,
  statusBarOptions,
  Notscrool,
}) => {
  const isFocused = useIsFocused();
  const [resfreshLoading, setRefreshLoading] = useState<boolean>(false);

  const wrapperBackgroundColor = useMemo(() => {
    return wrapperColor ?? '#F5F5F5';
  }, [wrapperColor]);

  const statusBarProps = {
    barStyle: statusBarOptions?.barStyle ?? 'dark-content',
    backgroundColor: !!statusBarOptions?.backgroundColor
      ? statusBarOptions?.backgroundColor
      : !!statusBarOptions?.translucent
      ? 'transparent'
      : wrapperColor ?? '#ffffff',
    animated: !!statusBarOptions?.animated ?? true,
    translucent: !!statusBarOptions?.translucent ?? false,
  };

  const wrapperProps = {
    align: align ?? 'flex-start',
    pad: typeof paddingBottom === 'number' ? toPixel(paddingBottom) : undefined,
    statusBarMargin,
    //marginTop: statusBarProps.translucent,
  };

  return (
    <>
      {isFocused && <StatusBar {...statusBarProps} />}
      <SafeAreaView style={{flex: 1, backgroundColor: wrapperBackgroundColor}}>
        <KeyboardAwareScrollView
          scrollEnabled={!Notscrool}
          style={{}}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: wrapperBackgroundColor,
          }}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            onRefresh && (
              <RefreshControl
                colors={loadingColor ? loadingColor : [themes.colors.primary]}
                refreshing={resfreshLoading}
                onRefresh={async () => {
                  setRefreshLoading(true);
                  await onRefresh();
                  setRefreshLoading(false);
                }}
              />
            )
          }>
          <Wrapper {...wrapperProps}>{children}</Wrapper>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default Render;
