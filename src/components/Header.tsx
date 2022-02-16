import { Center, Flex } from "@chakra-ui/react";
import { GoMarkGithub, GoQuestion } from "react-icons/go";

export default function Header() {
  function goToGithub() {
    window.open("https://github.com/ArturMiguel/apalavra", "_blank");
  }

  return (
    <Flex h="3rem" gap="4">
      <Center w="full" justifyContent="end">
        <GoQuestion size="1.7rem" title="Instruções" cursor="pointer" />
      </Center>
      <Center w="full">
        <h2 style={{ fontSize: "1.7rem", fontWeight: "bold" }}>
          <span style={{ color: "#04E762" }}>APA</span>
          <span style={{ color: "#F5B700" }}>LA</span>
          <span style={{ color: "#454545" }}>VRA</span>
        </h2>
      </Center>
      <Center w="full" justifyContent="start">
        <GoMarkGithub size="1.7rem" onClick={goToGithub} cursor="pointer" title="GitHub" />
      </Center>
    </Flex>
  )
}