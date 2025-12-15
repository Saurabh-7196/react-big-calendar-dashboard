import { useLayoutEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const BarChart = ({ data }) => {
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    if (!data || data.length === 0) return;

    const isMobile = window.innerWidth < 600;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    // Chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "none",
        wheelY: "none",
        paddingLeft: isMobile ? 10 : 0,
      })
    );

    // Cursor
    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {})
    );
    cursor.lineY.set("visible", false);

    // X Axis
    const xRenderer = am5xy.AxisRendererX.new(root, {
      minGridDistance: isMobile ? 15 : 30,
    });

    xRenderer.labels.template.setAll({
      rotation: isMobile ? -45 : 0,
      centerY: am5.p50,
      centerX: am5.p50,
      fontSize: isMobile ? 10 : 12,
    });

    xRenderer.grid.template.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "name",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    // Y Axis
    const yRenderer = am5xy.AxisRendererY.new(root, {});

    yRenderer.labels.template.setAll({
      fontSize: isMobile ? 10 : 12,
    });

    yRenderer.grid.template.setAll({
      strokeDasharray: [2, 2],
      strokeOpacity: 0.5,
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: yRenderer,
      })
    );

    // Series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Users",
        xAxis,
        yAxis,
        valueYField: "value",
        categoryXField: "name",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{categoryX}: {valueY}",
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 6,
      cornerRadiusTR: 6,
      strokeOpacity: 0,
    });

    // Data
    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Animations
    series.appear(800);
    chart.appear(800, 100);

    return () => {
      root.dispose();
    };
  }, [data]);

  return (
    <div
      ref={chartRef}
      style={{
        width: "100%",
        height: window.innerWidth < 600 ? "280px" : "400px",
      }}
    />
  );
};

export default BarChart;
