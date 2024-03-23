import { Box, useStyleConfig,useColorModeValue } from "@chakra-ui/react";
function Card(props) {
  const { variant, children, ...rest } = props;
  const bgColor = useColorModeValue("gray.5","pink");
  const styles = useStyleConfig("Card", { variant });
  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
export default Card;
