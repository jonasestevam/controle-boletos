import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Container, TabMarker, TabTitle, TabTitleContainer} from './styles';

interface ITabNavigator {
  tabsTitle: string[];
  activePageIndex: number;
  onTabTap: (page: number) => void;
}

export const TabNavigator = ({
  tabsTitle,
  activePageIndex,
  onTabTap,
}: ITabNavigator) => {
  const handleTabClick = (page: number) => {
    onTabTap(page);
  };
  return (
    <Container>
      {tabsTitle.map((title, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleTabClick(index);
          }}>
          <TabTitleContainer>
            <TabTitle>{title}</TabTitle>
            {activePageIndex === index && <TabMarker />}
          </TabTitleContainer>
        </TouchableOpacity>
      ))}
    </Container>
  );
};
