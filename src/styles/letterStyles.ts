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
    background: "#018E42",
    border: "none"
  }
}

export const wrongLetterStyle = {
  "& > :not(style)": {
    ...defaultLetterStyle["& > :not(style)"],
    color: "#fff",
    background: "#ff6363",
    border: "none"
  }
}

export const partialLetterStyle = {
  "& > :not(style)": {
    ...defaultLetterStyle["& > :not(style)"],
    color: "#fff",
    background: "#ffa959",
    border: "none"
  }
}