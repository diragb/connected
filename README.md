<br/>
<img src="public/icon.png" width="100px"/>

# connected

connected uses 3d-force-graph to map out the connections between my friends, and the friends of my friends. the dataset was acquired through web scraping using a python + selenium script.

## how to use?

to scrape user details, i recommend opening the /python/ directory in PyCharm and letting it configure everything. you'll find an array at the bottom of the script. populate that with facebook usernames you'd like to scrape.

to generate data, open /src/ in cmd and run:

```
node index.js
```

this will create dirty_dataset.json in the directory. then, clean the dataset using:

```
node clean.js
```

this will generate output_dataset.json in the /public/ directory. this is the entry-point for the react application. however, since we're not using a server to host files, you will need to upload the output_dataset.json file to some static hostin service. in my case, i use github.

## credits

big credits to the author of [react-force-graph](https://github.com/vasturiano/react-force-graph) and the peeps at [vercel](https://github.com/vercel).
