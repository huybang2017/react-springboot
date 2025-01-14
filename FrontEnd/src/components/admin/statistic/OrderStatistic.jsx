import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { IoReload } from 'react-icons/io5'
import ReactApexCharts from 'react-apexcharts'
import AxiosAdmin from '../../../apis/AxiosAdmin.jsx'

const buildQueryString = (filters) => {
  const params = new URLSearchParams()

  Object.entries({
    ...filters,
  }).forEach(([key, value]) => {
    if (value) {
      params.append(key, value)
    }
  })

  return params.toString()
}

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

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const parseDateToISO = (dateString) => {
  const [day, month, year] = dateString.split('/')
  return `${year}-${month}-${day}`
}

const OrderStatistic = () => {
  const [filterValues, setFilterValues] = useState({
    minDate: '',
    maxDate: '',
  })

  const [minDate, setMinDate] = useState('')
  const [maxDate, setMaxDate] = useState('')

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

    legend: {
      show: false,
    },
  })

  const [error, setError] = useState('')

  useEffect(() => {
    const query = buildQueryString(filterValues)
    const getSumaryOrder = async () => {
      try {
        const response = await AxiosAdmin.get(
          `${import.meta.env.VITE_API_URL}/Statistic/OrderStatus?${query}`,
        )
        const data = response.data

        const defaultStatuses = [
          'DangGiao',
          'GiaoThanhCong',
          'ChoDuyet',
          'DaDuyet',
          'Huy',
        ]

        const groupedData = data.reduce((acc, item) => {
          const isoDate = parseDateToISO(item.updateDate)
          const key = `${isoDate}-${item.status}`
          if (!acc[key]) {
            acc[key] = 0
          }
          acc[key] += item.quantity
          return acc
        }, {})

        const dates = Array.from(
          new Set(data.map((item) => parseDateToISO(item.updateDate))),
        )

        const seriesData = defaultStatuses.map((status) => {
          return {
            name: CheckStatus[status],
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
  }, [filterValues])

  const validateDates = () => {
    if (!minDate && !maxDate) {
      setError('Vui lòng chọn ngày bắt đầu hoặc ngày kết thúc.')
      return false
    }

    if (new Date(minDate) > new Date(maxDate)) {
      setError('Ngày bắt đầu không thể lớn hơn ngày kết thúc.')
      return false
    }

    setError('')
    return true
  }

  const handleSearch = () => {
    if (validateDates()) {
      setFilterValues({
        ...filterValues,
        minDate: formatDate(minDate),
        maxDate: formatDate(maxDate),
      })
    }
  }

  const handleReset = () => {
    setFilterValues({ minDate: '', maxDate: '' })
    setMinDate('')
    setMaxDate('')
    setError('')
  }

  return (
    <div className="space-y-10">
      <div className="flex gap-4 items-center bg-[#ece9e9] p-3 rounded-md">
        <label htmlFor="from">Ngày bắt đầu</label>
        <input
          type="date"
          className="rounded-md"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
        <label htmlFor="to">Ngày kết thúc</label>
        <input
          type="date"
          className="rounded-md"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
        <button className="bg-white p-1 rounded-md" onClick={handleSearch}>
          <CiSearch size={25} />
        </button>
        <button className="bg-white p-1 rounded-md" onClick={handleReset}>
          <IoReload size={25} />
        </button>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div>
        <div className="flex items-center justify-between gap-4">
          {chartOptions.series.map((item, index) => {
            let sum = 0
            item.data.forEach((value) => {
              sum += value
            })

            // Tìm key tương ứng từ CheckStatus để lấy màu từ statusColors
            const statusKey = Object.keys(CheckStatus).find(
              (key) => CheckStatus[key] === item.name,
            )
            const color = statusColors[statusKey] || '#000'

            return (
              <div
                key={item.name}
                className={`border flex-grow px-10 py-5 rounded-md cursor-pointer`}
                style={{ backgroundColor: color }}
              >
                <h3 className="text-white text-center text-xl font-semibold">
                  {item.name}
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
    </div>
  )
}

export default OrderStatistic
