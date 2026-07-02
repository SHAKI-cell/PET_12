import https from "https";

const apiKey = "AQ.Ab8RN6KgWi0gZRJdDvhSIx2ogm5KbFLH4RcmeNWt8ihE6RmD2w";

function listModels() {
  return new Promise((resolve) => {
    console.log("Listing available models for the new AQ key...");
    
    const options = {
      method: "GET",
      hostname: "generativelanguage.googleapis.com",
      path: `/v1beta/models?key=${apiKey}`,
      headers: { "User-Agent": "Mozilla/5.0" }
    };
    
    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Response: ${data}`);
        resolve();
      });
    });
    
    req.on("error", (err) => {
      console.error(`Request error: ${err.message}`);
      resolve();
    });
    
    req.end();
  });
}

listModels();
