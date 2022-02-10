export const defaultLetterStyle = {
  "& > :not(style)": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    border: "1px solid grey",
    cursor: "pointer",
    fontWeight: "bold"
  }
}

export const correctLetterStyle = {
  "& > :not(style)": {
    ...defaultLetterStyle["& > :not(style)"],
    color: "#fff",
    background: "#04E762",
    border: "none"
  }
}

export const wrongLetterStyle = {
  "& > :not(style)": {
    ...defaultLetterStyle["& > :not(style)"],
    color: "#fff",
    background: "#454545",
    border: "none"
  }
}

export const partialLetterStyle = {
  "& > :not(style)": {
    ...defaultLetterStyle["& > :not(style)"],
    color: "#fff",
    background: "#F5B700",
    border: "none"
  }
}