// CSS

import '../node_modules/css-reset-and-normalize/css/reset-and-normalize.min.css'
import './assets/main.css'

// Libraries

import { json, xml, image, extent, scaleLinear } from 'd3'
import { Application, BitmapFont, Texture, Sprite, Point } from 'pixi.js'
import { Viewport } from 'pixi-viewport'

// Assets

import background from './draw/background'
import drawClusters from './draw/clusters.js'
import contours from './draw/contours.js'
import keywords_close from './draw/keywords_close.js'
import keywords_distant from './draw/keywords_distant.js'
import nodes from './draw/nodes.js'

import fps from './interface/fps.js'
import search from './interface/search'
import stats from './interface/stats'

import fontXML from './assets/Lato.fnt'
import fontPNG from './assets/Lato.png'

import backgroundImage from './assets/background_white.png'

import clusters from './data/clusters.json'
import embedding from './data/embedding.json'
import lemmas from './data/lemmas.json'
import pairs from './data/pairs.json'

// Global variables

window.s = {
    // distance: 30,
    // nodes,
    // tokens: []
}

// Start

Promise.all([
    json(embedding),
    json(lemmas),
    json(pairs),
    json(clusters),
    xml(fontXML),
    image(fontPNG),
    image(backgroundImage),


]).then(([embedding, lemmas, pairs, clusters, fontXML, fontPNG, backgroundImage]) => {


    // Set data

    let data = embedding.reduce((array, value, i) => {
        array[i] = [...embedding[i], lemmas[i].length]
        return array
    }, [])


    // Set app

    s.app = new Application({
        antialias: true,
        resolution: 2,
        autoDensity: true,
        autoResize: true,
        resizeTo: window
    })

    document.body.prepend(s.app.view)


    // Set viewport

    s.viewport = new Viewport({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        interaction: s.app.renderer.plugins.interaction
    }).drag().pinch().wheel().decelerate()
        .clampZoom({
            minWidth: 50, minHeight: 50,
            maxWidth: window.innerWidth,
            maxHeight: window.innerHeight
        })
        .clamp({ direction: 'all' })

    s.app.stage.addChild(s.viewport)



    // Centering

    const extX = extent(data, d => d[0]), extY = extent(data, d => d[1])
    const marginLeft = (window.innerWidth - extX[1] - extX[0]) / 2
    const marginTop = (window.innerHeight - extY[1] - extY[0]) / 2

    data.forEach(d => { d[0] += marginLeft; d[1] += marginTop })



    // Transparency on zoom

    const zoomStart = 1, zoomEnd = 2

    const zoomOut = scaleLinear().domain([zoomEnd, zoomStart]) // Visible when zooming out
    const zoomIn = scaleLinear().domain([zoomStart, zoomEnd]) // Visible when zooming in

    s.viewport.on('zoomed', e => {

        const scale = (typeof e.viewport.lastViewport === 'undefined') ? 1 : e.viewport.lastViewport.scaleX;
        
        e.viewport.children.find(child => child.name == 'contours').alpha = zoomOut(scale)
        e.viewport.children.find(child => child.name == 'nodes').alpha = zoomIn(scale)
        e.viewport.children.find(child => child.name == 'keywords_close').alpha = zoomIn(scale)
        e.viewport.children.find(child => child.name == 'clusters').alpha = zoomOut(scale)
    })

    
    // Font loader

    BitmapFont.install(fontXML, Texture.from(fontPNG))


    // Rendering

    background(backgroundImage)
    contours(data)
    nodes(data)
    keywords_close(pairs)
    // keywords_distant()
    drawClusters(data, clusters)
    fps()
    // search(data)

    s.viewport.fit()
    s.viewport.moveCenter(window.innerWidth / 2, window.innerHeight / 2)

    // Prevent pinch gesture in Chrome

    window.onresize = () => {
        s.viewport.resize()
    }

    // Prevent wheel interference

    window.addEventListener('wheel', e => {
        e.preventDefault()
    }, { passive: false })

})