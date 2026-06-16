// Tree-shaken ECharts: only the chart types, components and renderer we use.
import * as echarts from 'echarts/core'
import { LineChart, BarChart, ScatterChart, EffectScatterChart } from 'echarts/charts'
import { GridComponent, TooltipComponent } from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  EffectScatterChart,
  GridComponent,
  TooltipComponent,
  SVGRenderer,
])

export default echarts
