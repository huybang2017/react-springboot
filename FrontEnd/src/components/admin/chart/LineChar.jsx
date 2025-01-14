import React, { useEffect, useState } from 'react'
import ReactApexCharts from 'react-apexcharts'
import AxiosAdmin from '../../../apis/AxiosAdmin.jsx'

const CheckStatus = {
  DangGiao: 'Đang giao',
  GiaoThanhCong: 'Giao thành công',
  ChoDuyet: 'Chờ duyệt',
  DaDuyet: 'Đã duyệt',
  Huy: 'Đã hủy',
}

const statusColors = {
  DangGiao: '#008ffb',
  GiaoThanhCong: '#00e396',
  ChoDuyet: '#feb019',
  DaDuyet: '#ff4560',
  Huy: '#775dd0',
}

const LineChar = ({ query }) => {
  const [chartOptions, setChartOptions] = useState({
    series: [],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    stroke: {
      width: [5, 5, 4],
      curve: 'smooth',
    },
    xaxis: {
      categories: [],
    },
    // Ẩn chú thích (legend)
    legend: {
      show: false,
    },
  })

  useEffect(() => {
    const getSumaryOrder = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Statistic/OrderStatus?${query}`,
        )
        const data = response.data

        console.log('Dữ liệu API:', data)

        const defaultStatuses = [
          'DangGiao',
          'GiaoThanhCong',
          'ChoDuyet',
          'DaDuyet',
          'Huy',
        ]

        const groupedData = data.reduce((acc, item) => {
          const key = `${item.updateDate}-${item.status}`
          if (!acc[key]) {
            acc[key] = 0
          }
          acc[key] += item.quantity
          return acc
        }, {})

        const dates = Array.from(new Set(data.map((item) => item.updateDate)))

        const seriesData = defaultStatuses.map((status) => {
          return {
            name: status,
            data: dates.map((date) => groupedData[`${date}-${status}`] || 0),
          }
        })

        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: seriesData,
          xaxis: {
            categories: dates,
          },
        }))
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đơn hàng', error)
      }
    }

    getSumaryOrder()
  }, [query])

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        {chartOptions.series.map((item) => {
          let sum = 0
          item.data.forEach((value) => {
            sum += value
          })

          const color = statusColors[item.name] || '#000'

          return (
            <div
              key={item.name}
              className={`border w-full px-10 py-5 rounded-md cursor-pointer`}
              style={{ backgroundColor: color }}
            >
              <h3 className="text-white text-center text-xl font-semibold">
                {CheckStatus[item.name]}
              </h3>
              <p className="text-white text-center text-md font-semibold ">
                {sum} đơn hàng
              </p>
            </div>
          )
        })}
      </div>
      <ReactApexCharts
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={350}
      />
    </div>
  )
}

export default LineChar
