import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {AnimatePresence, MotiView} from 'moti';
import {useTheme} from '../../Theme/ThemeContext';

interface Props {
  isVisible: boolean;
  hideActivity?: boolean;
}

export default function DisabledOverlay({
  isVisible,
  hideActivity = false,
}: Props) {
  const {colors} = useTheme();

  return (
    <AnimatePresence>
      {isVisible && (
        <MotiView
          from={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          style={{
            position: 'absolute',
            zIndex: 900,
            top: 0,
            left: 0,
            elevation: 10000101001,
            right: 0,
            bottom: 0,
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.22)',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          {!hideActivity && (
            <View
              style={{
                zIndex: 100,
                position: 'relative',
              }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        </MotiView>
      )}
    </AnimatePresence>
  );
}
