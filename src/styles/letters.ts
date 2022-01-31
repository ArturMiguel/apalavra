export const defaultLetter = {
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

export const correctLetter = {
  "& > :not(style)": {
    ...defaultLetter["& > :not(style)"],
    color: "#fff",
    background: "#018E42",
    border: "none"
  }
}

export const wrongLetter = {
  "& > :not(style)": {
    ...defaultLetter["& > :not(style)"],
    color: "#fff",
    background: "#150811",
    border: "none"
  }
}

export const partialLetter = {
  "& > :not(style)": {
    ...defaultLetter["& > :not(style)"],
    color: "#fff",
    background: "#F7D002",
    border: "none"
  }
}