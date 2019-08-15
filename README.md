# thor-connexql
thor connex graphql

###  Install
`npm i`

### Run
`npm start`
Open graphiql in `http://localhost:3000`

### Environment variables

`THOR_URL: Thor node`

### Sample
```graphql
{
  contractFilter(
    abiSignature: "event LogSetQuestOutcome(bytes32 indexed id,address indexed user,uint256 questEntryCount)", 
    address: "0xe24dBBEd860aD4b71cf69ED9c0AcEeeDcA99f934", 
    filter: {
      indexed: [{
        user: "0xf02e4e64f9f7fe6e461f136d248baab3c1f2a11e"
      }], 
      order: "desc", 
      limit: 200,
    range: {
      from: "06/01/2019"
    	to: "07/30/2019"
    },
    }) {
    meta{
      txID
    }
    txDate
    timestamp
    address
    decoded
  }
}

```