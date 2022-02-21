import { Flex, Circle, Text, Image } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Flex align="center">
      <Circle bgColor={"#262626"} size={10}>
        <Image alt="NEAR" src="/near_icon_wht.svg"></Image>
      </Circle>
      <Text ml={2} fontWeight={600}>
        NEAR Visualizer
      </Text>
    </Flex>
  );
};

export default Logo;
