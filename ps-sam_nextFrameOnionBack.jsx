#target photoshop

var doc = activeDocument;

var activeLayerName = doc.activeLayer.name;
var activeLayerType = doc.activeLayer.typename;

var frameNumber = null;
var nextFrame = 0;
var frameArrayIndex = 0;

var frames = new Array();
frames[0] = doc.activeLayer.name.split(/(\d+)/);

var i = 0;

readLayers(doc);

function readLayers(doc) {
	if(activeLayerType == "ArtLayer") {
		for(i = 0; i < doc.layers.length; i++) {
			// if(doc.layers[i].typename == "ArtLayer") {

				var partsOfName = doc.layers[i].name.split(/(\d+)/);
				
				if(partsOfName.length == frames[0].length) {

					var flag = 0;
					for(var j = 0; j < partsOfName.length; j++) {
						if(partsOfName[j] != frames[0][j] && !isNaN(partsOfName[j])) {
							flag += 1;
							frameNumber = j;						
						};
					};

					if(flag == 1) {
						doc.layers[i].visible = 0;
						frames.push(partsOfName);
					} else if (flag == 0) {
						doc.layers[i].visible = 0;
					};
				};
				
			// };		
		};	
	} else if (activeLayerType == "LayerSet") {
		
	};
};

curFrame = frames[0][frameNumber];
frames = frames.sort()

i = 0;
while(curFrame > frames[i][frameNumber]) {
	i++;
	frameArrayIndex = i;
};

if(frameArrayIndex != 0) {
	nextFrame = frameArrayIndex - 1;	
} else {
	nextFrame = frames.length-1;
};

doc.activeLayer = doc.artLayers.getByName(frames[nextFrame].join(""));
